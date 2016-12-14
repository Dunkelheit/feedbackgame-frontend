<template>
    <div id="app">
        <nav v-if="loggedIn" class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">The Feedback App</a>
                </div>
                <div id="navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <router-link tag="li" :to="{name: 'myReviews'}">
                            <a>My Reviews</a>
                        </router-link>
                        <router-link v-if="isAdmin" tag="li" :to="{name: 'adminCards'}">
                            <a>Cards</a>
                        </router-link>
                        <router-link v-if="isAdmin" tag="li" :to="{name: 'adminUsers'}">
                            <a>Users</a>
                        </router-link>
                        <router-link v-if="isAdmin" tag="li" :to="{name: 'adminReviews'}">
                            <a>Reviews</a>
                        </router-link>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#" v-on:click="logout" class="logout-button">Logout</a></li>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </nav>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    methods: {
        logout() {
            this.$store.commit('logout');
            document.body.className = 'logged-out';
            delete localStorage.feedbackAppToken;
            delete localStorage.feedbackAppRole;
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        },
        isAdmin() {
            return this.$store.state.role === 'admin';
        }
    }
}
</script>

<style>
body {
    font-family: 'gotham-light';
    background-image: url('/static/img/jumbo-team.jpg');
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
}
body.logged-in {
    background-image: none;
    padding-top: 100px;
}
.navbar {
    background-color: #F3F3F3;
    height: 100px;
    border-bottom: 2px solid #FFB60E;
    color: #000000;
}
.navbar-inverse .navbar-nav>li>a, .navbar-inverse .navbar-nav>li>a:hover, .navbar-inverse .navbar-nav>li>a:focus {
    color: #000000;
}
.navbar-inverse .navbar-nav>.active>a, .navbar-inverse .navbar-nav>.active>a:hover, .navbar-inverse .navbar-nav>.active>a:focus {
    text-decoration: underline;
    background-color: #F3F3F3;
    color: #000000;
}
.logout-button {
    background-color: #FFFFFF;
    color: #000000 !important;
    font-family: 'gotham-bold';
    -webkit-box-shadow: -4px 4px 0px 0px #393939;
    -moz-box-shadow:    -4px 4px 0px 0px #393939;
    box-shadow:         -4px 4px 0px 0px #393939;
    margin-top: 20px;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
}
.logout-button:hover {
    background-color: #FFFFFF !important;
}
.navbar-header {
    display: none;
}
</style>
