<template>
    <div>
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div v-if="error" class="alert alert-danger" role="alert">
            <strong>Oh snap!</strong> Something went wrong.
        </div>
        <p class="caption">
            Please give feedback to your team member by dragging and dropping the cards into the placeholders<br />
            You can give it a comment by clicking the "i" on the card.
        </p>
        <div v-if="review" class="recipient">
            <div class="row profile-container">
                <div class="col-md-6">
                    <div class="pica" v-bind:style="'background-image: url(/static/img/' + review.reviewee.avatar + ');'"><span>Pica of {{ review.reviewee.firstName }}</span></div>
                    <ul>
                        <li class="full-name">{{ review.reviewee.fullName }}</li>
                        <li class="job-title">{{ review.reviewee.jobTitle }}</li>
                        <li class="email">{{ review.reviewee.email }}</li>
                    </ul>
                    <div class="button-container">
                        <button class="btn btn-default" type="submit">Cancel</button>
                        <button class="btn btn-success" type="submit">Send</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="card-recipient positive"></div>
                </div>
                <div class="col-md-2">
                    <div class="card-recipient positive"></div>
                </div>
                <div class="col-md-2">
                    <div class="card-recipient negative"></div>
                </div>
            </div>
        </div>
        <div v-for="row in chunkedCards" class="row cards">
            <div v-for="card in row" class="col-md-2 cards-container">
                <div :class="'noselect card ' + (card.category === 0 ? 'positive' : 'negative')">
                    <div class="card-icon"><span>{{card.category === 0 ? 'Approve' : 'Improve'}}</span></div>
                    <p class="card-name">{{card.title}}</p>
                    <a class="card-comment" href="#"><span>Drop a comment</card></a>
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
    data() {
        return {
            loading: false,
            review: null,
            cards: [],
            error: null
        };
    },
    created() {
        this.fetchReviewAndCards();
    },
    watch: {
        '$route': 'fetchReviewAndCards'
    },
    methods: {
        fetchReviewAndCards() {
            this.error = null;
            this.review = null;
            this.cards = [];
            this.loading = true;

            axios.all([
                axios.get('/api/reviews/' + this.$route.params.id, {
                    headers: {
                        'x-auth-token': this.$store.state.loggedIn
                    }
                }),
                axios.get('/api/cards', {
                    headers: {
                        'x-auth-token': this.$store.state.loggedIn
                    }
                })
            ]).then(axios.spread((review, cards) => {
                this.review = review.data;
                this.cards = cards.data;
                this.loading = false;
                this.loadInteract();
            })).catch(error => {
                if (error.response.status === 401) {
                    this.$router.replace({ name: 'home' });
                } else {
                    this.error = error;
                }
            });
        },
        loadInteract() {
            interact('.card').draggable({
                inertia: true,
                autoScroll: true,
                onmove: function (event) {
                    var target = event.target;
                    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                onstart: function (event) {
                    event.target.classList.add('noshadow');
                },
                onend: function (event) {
                    event.target.classList.remove('noshadow');
                }
            });

            interact('.card-recipient').dropzone({
                accept: '.card',
                overlap: 0.75,
                ondropactivate: function (event) {
                },
                ondropdeactivate: function (event) {
                },
                ondragenter: function (event) {
                    event.target.classList.add('drop-active');
                },
                ondragleave: function (event) {
                    event.target.classList.remove('drop-active');
                },
                ondrop: function (event) {
                }
            });
        }
    },
    computed: {
        chunkedCards() {
            return chunk(this.cards, 6);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
    width: 140px;
    height: 203px;
    background-image: url('/static/img/card-background.png');
    background-repeat: no-repeat;
    -webkit-box-shadow: -4px 4px 0px 0px #393939;
    -moz-box-shadow:    -4px 4px 0px 0px #393939;
    box-shadow:         -4px 4px 0px 0px #393939;
    margin-bottom: 25px;
}
.noshadow {
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    box-shadow: none !important;
}

.recipient {
    height: 243px;
    background-color: #F3F3F3;
    margin-bottom: 40px;
}
.recipient .profile-container {
    padding-top: 20px;
}
.recipient .pica {
    margin-left: 20px;
    float: none;
}
.recipient .profile-container ul {
    margin-left: 20px !important;
    margin-top: 5px;
    margin-left: 0;
    padding-left: 0;
}
.button-container {
    margin-left: 25px;
    margin-top: 25px;
}
.button-container .btn {
    -webkit-box-shadow: -4px 4px 0px 0px #393939;
    -moz-box-shadow:    -4px 4px 0px 0px #393939;
    box-shadow:         -4px 4px 0px 0px #393939;
    border: 0;
    color: #393939;
    border-radius: 0;
    font-family: 'gotham-bold';
    font-size: 14px;
}
.button-container .btn-default {
    background-color: #FFFFFF;
}
.button-container .btn-success {
    background-color: #FEE19E;
    margin-left: 2px;
}
.drop-active {
    background-color: #9ff1a7;
}
.card-recipient {
    width: 140px;
    height: 203px;
    border-style: dashed;
    border-width: 2px;
}
.card-recipient.positive {
    border-color: #9fdaf1;
}
.card-recipient.negative {
    border-color: #ffe65d;
}
.caption {
    font-size: 14px;
    font-family: 'gotham-book';
    margin-bottom: 25px;
}
.card p {
    color: #000000;
}
.card.positive {
    background-color: #9fdaf1;
}
.card.negative {
    background-color: #ffe65d;
}
.card-icon {
    width: 41px;
    height: 71px;
    margin: 0 auto 18px;
    background-repeat: no-repeat;
    background-position: 0 30px;
}
.positive .card-icon {
    background-image: url(/static/img/thumbs-up.png);
}
.negative .card-icon {
    background-image: url(/static/img/helmet.png);
}
.card-icon span {
    display: none;
}
.card-name {
    font-family: 'gotham-black';
    text-transform: uppercase;
    font-size: 18px;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    line-height: 20px;
}
.card-comment {
    display: block;
    background-image: url('/static/img/info.png');
    width: 21px;
    height: 20px;
    position: absolute;
    bottom: 45px;
    left: 50%;
    margin-left: -25px;
}
.card-comment span {
    display: none;
}
</style>
