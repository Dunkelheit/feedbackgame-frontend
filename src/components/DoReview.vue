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
        <div v-for="row in chunkedCards" class="row cards">
            <div v-for="card in row" class="col-md-2 cards-container">
                <div class="card positive">
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
            axios.get('/api/cards', {
                headers: {
                    'x-auth-token': this.$store.state.loggedIn
                }
            }).then(response => {
                this.cards = response.data;
                this.loading = false;
            }).catch(error => {
                this.error = error;
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
.card p {
    color: #000000;
}
.positive {
    background-color: #9fdaf1;
}
.negative {
    background-color: #ffe65d;
}
.caption {
    font-size: 14px;
    font-family: 'gotham-book';
    margin-bottom: 25px;
    margin-top: 25px;
}
.card-icon {
    width: 41px;
    height: 41px;
    margin: 0 auto 18px auto;
    background-image: url('/static/img/thumbs-up.png');
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
