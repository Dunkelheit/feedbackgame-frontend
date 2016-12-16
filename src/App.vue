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
                    <div class="profile-container">
                        <div class="pica" v-bind:style="'background-image: url(/static/img/' + profile.avatar + ');'"><span>Pica of {{ profile.firstName }}</span></div>
                        <ul>
                            <li class="full-name">{{ profile.fullName }}</li>
                            <li class="job-title">{{ profile.jobTitle }}</li>
                            <li class="email">{{ profile.email }}</li>
                        </ul>
                    </div>
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
            delete localStorage.feedbackAppUser;
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        },
        isAdmin() {
            return this.$store.state.role === 'admin';
        },
        profile() {
            return JSON.parse(localStorage.feedbackAppUser);
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
    padding-top: 120px;
}
.navbar {
    background-color: #F3F3F3;
    height: 100px;
    border-bottom: 2px solid #FFB60E;
    color: #000000;
}
.navbar-nav {
    margin-top: 30px;
    margin-left: 50px;
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
    /*margin-top: 25px;*/
    padding-top: 10px !important;
    padding-bottom: 10px !important;
}
.logout-button:hover {
    background-color: #FFFFFF !important;
}
.navbar-header button, .navbar-brand {
    display: none;
}
.profile-container .pica {
    float: left;
}
.profile-container ul {
    margin-left: 60px;
    margin-top: 25px;
    padding-left: 10px;
}
.profile-container ul li {
    list-style: none;
}
.pica {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: 50% 50%
}
.pica span {
    display: none;
}
.full-name, .job-title, .email {
    font-size: 14px;
}
.full-name {
    font-family: 'gotham-bold';
    font-size: 14px;
}
.email {
    color: #868686;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
     -khtml-user-select: none; /* Konqueror */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  not supported by any browser */
}
</style>
