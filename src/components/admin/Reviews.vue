<template>
    <div>
        <div class="page-header">
            <button type="button" class="btn btn-primary pull-right" v-on:click="openModal">Create</button>
            <h1>Reviews</h1>
        </div>
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div v-if="error" class="alert alert-danger" role="alert">
            <strong>Oh snap!</strong> Something went wrong.
        </div>
        <div v-if="reviews.length > 0" class="content">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Who reviews who</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="review in reviews">
                        <td><a href="#" v-on:click="loadReview(review.id, $event)"><strong>{{review.reviewer.fullName}}</strong> reviews <strong>{{review.reviewee.fullName}}</strong></a></td>
                        <td>{{review.completed ? 'Yes' : 'No'}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="createModal" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{ review.id ? (review.completed ? 'See' : 'Update') : 'Create' }} review</h4>
                    </div>
                    <form v-on:submit="createReview">
                        <div class="modal-body">
                            <input v-model="review.id" type="hidden" />
                            <div class="form-group">
                                <label for="inputReviewer">Reviewer</label>
                                <select :disabled="review.completed" id="inputReviewer" class="form-control" v-model="review.reviewerId" required autofocus>
                                    <option v-for="user in users" v-bind:value="user.id">{{user.fullName}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="inputReviewee">Reviewee</label>
                                <select :disabled="review.completed" id="inputReviewee" class="form-control" v-model="review.revieweeId" required>
                                    <option v-for="user in users" v-bind:value="user.id">{{user.fullName}}</option>
                                </select>
                            </div>
                            <div v-if="review.completed">
                                <ul>
                                    <li v-for="card in review.cards">{{ card.title }}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">{{ review.id ? 'Update' : 'Create' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'reviews',
    data () {
        return {
            loading: false,
            reviews: [],
            users: [],
            error: null,
            review: {
                id: null,
                reviewerId: null,
                revieweeId: null,
                completed: false,
                cards: []
            }
        };
    },
    created() {
        this.fetchReviewsAndUsers();
    },
    watch: {
        '$route': 'fetchReviewsAndUsers'
    },
    methods: {
        openModal(event) {
            if (event) {
                event.preventDefault();
            }
            this.review.id = null;
            this.review.reviewerId = null;
            this.review.revieweeId = null;
            this.review.completed = false;
            this.review.cards = [];
            $('#createModal').modal('show');
        },
        createReview() {
            this.error = null;
            axios.post('/api/reviews', {
                reviewerId: this.review.reviewerId,
                revieweeId: this.review.revieweeId
            }, {
                headers: {
                    'x-auth-token': this.$store.state.loggedIn
                }
            }).then(this.fetchReviews).catch(error => {
                this.error = error;
                $('#createModal').modal('hide');
            });
        },
        fetchReviews() {
            this.error = null;
            this.reviews = [];
            this.loading = true;
            axios.get('/api/reviews', {
                headers: {
                    'x-auth-token': this.$store.state.loggedIn
                }
            }).then(response => {
                this.reviews = response.data;
                this.loading = false;
                $('#createModal').modal('hide');
            }).catch(error => {
                this.error = error;
                $('#createModal').modal('hide');
            });
        },
        fetchReviewsAndUsers() {
            this.error = null;
            this.reviews = [];
            this.users = [];
            this.loading = true;
            axios.all([
                axios.get('/api/reviews', {
                    headers: {
                        'x-auth-token': this.$store.state.loggedIn
                    }
                }),
                axios.get('/api/users', {
                    headers: {
                        'x-auth-token': this.$store.state.loggedIn
                    }
                })
            ]).then(axios.spread((reviews, users) => {
                this.reviews = reviews.data;
                this.users = users.data;
                this.loading = false;
            })).catch(error => {
                if (error.response.status === 401) {
                    this.$router.replace({ name: 'home' });
                } else {
                    this.error = error;
                }
            });
        },
        loadReview(reviewId, event) {
            if (event) {
                event.preventDefault();
            }
            this.reviews.forEach(review => {
                if (review.id === reviewId) {
                    this.review.id = review.id;
                    this.review.reviewerId = review.reviewer.id;
                    this.review.revieweeId = review.reviewee.id;
                    this.review.completed = review.completed;
                    this.review.cards = review.cards;
                    $('#createModal').modal('show');
                    return;
                }
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
