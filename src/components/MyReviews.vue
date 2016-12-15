<template>
    <div class="row">
        <div class="col-md-4 my-tasks">
            <div class="page-header">
                <h1>My Tasks</h1>
            </div>
            <div class="loading" v-if="loading">
                Loading...
            </div>
            <div v-if="error" class="alert alert-danger" role="alert">
                <strong>Oh snap!</strong> Something went wrong.
            </div>
            <div v-if="reviews.length > 0" class="content">
                <p class="caption">Please give feeback to your following team members:</p>
                <div v-for="row in chunkedReviews" class="row">
                    <div v-for="review in row" class="col-sm-4 reviewee-container">
                        <router-link :to="{ name: 'doReview', params: { id: review.id }}">
                            <div class="pica" v-bind:style="'background-image: url(/static/img/' + review.reviewee.avatar + ');'">
                                <div class="yellow-shit"></div>
                                <span>Pica of {{ review.reviewee.firstName }}</span>
                            </div>
                            <p>{{review.reviewee.firstName}}<br />{{review.reviewee.surname}}</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {chunk} from 'lodash';
export default {
    name: 'reviews',
    data () {
        return {
            loading: false,
            reviews: [],
            error: null
        };
    },
    created() {
        this.fetchMyReviews();
    },
    watch: {
        '$route': 'fetchMyReviews'
    },
    methods: {
        fetchMyReviews() {
            this.error = null;
            this.reviews = [];
            this.loading = true;
            axios.get('/api/my/reviews', {
                headers: {
                    'x-auth-token': this.$store.state.loggedIn
                }
            }).then(response => {
                this.reviews = response.data;
                this.loading = false;
            }).catch(error => {
                this.error = error;
            });
        }
    },
    computed: {
        chunkedReviews() {
            return chunk(this.reviews, 3);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-tasks {
    background-color: #F3F3F3;
}
.page-header {
    margin-top: 20px;
    padding-bottom: 0;
    border-bottom: 1px solid #000000;
}
.page-header h1 {
    font-size: 24px;
}
.reviewee-container {
    text-align: center;
    margin-bottom: 20px;
}
.reviewee-container .pica {
    margin: 0 auto 8px auto;
}
.reviewee-container a {
    font-size: 14px;
    font-family: 'gotham-bold';
    color: #000000;
    line-height: 15px;
}
.caption {
    font-size: 14px;
    font-family: 'gotham-book';
    margin-bottom: 20px;
}
.yellow-shit {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    border-radius: 50%;
    margin: 0 auto;
    transition: 0.2s;
    background-color: rgba(255, 182, 14, 0);
}
.reviewee-container a:hover, .reviewee-container a:focus, .reviewee-container a:active {
    text-decoration: none;
}
.reviewee-container a:hover .yellow-shit {
    background-color: rgba(255, 182, 14, 0.5);
    transition: 0.2s;
}
.reviewee-container p {
    color: rgb(0, 0, 0);
    transition: 0.2s;
}
.reviewee-container a:hover p {
    color: rgb(255, 182, 14);
    transition: 0.2s;
}
</style>
