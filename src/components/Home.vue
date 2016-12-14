<template>
    <div>
        <div v-if="loggedIn" class="page-header">
            <h1>Welecome to the Feedback App!</h1>
        </div>
        <div v-if="!loggedIn" class="container">
            <div class="form-signin-container">
                <form v-on:submit="login" class="form-signin">
                    <h2 class="form-signin-heading">Thank you<br />for being you</h2>
                    <h3 class="form-signin-subheading">&mdash; The feedback platform &mdash;</h3>

                    <label for="inputUsername">Enter your Ice username</label>
                    <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Ice username" required autofocus>
                    <label for="inputPassword">Enter your Ice password</label>
                    <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Ice password" required>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                </form>
            </div>
            <div v-if="error" class="alert alert-danger" role="alert">
                <strong>Oh snap!</strong> Looks like your credentials are not correct.
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'home',
    data () {
        return {
            loading: false,
            error: null,
            username: '',
            password: ''
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        },
        isAdmin() {
            return this.$store.state.role === 'admin';
        }
    },
    methods: {
        login() {
            this.error = null;
            axios.post('/api/login', {
                username: this.username,
                password: this.password
            }).then(response => {
                const token = response.headers['x-auth-token'];
                const role = response.data.role;
                this.$store.commit('login', {
                    token: token,
                    role: role
                });
                localStorage.feedbackAppToken = token;
                localStorage.feedbackAppRole = role;
                document.body.className = 'logged-in';
                this.username = '';
                this.password = '';
            }).catch(error => {
                this.error = error;
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert {
    max-width: 430px;
    margin: 0 auto;
}
.form-signin-container {
    max-width: 300px;
    height: 415px;
    margin: 0 auto;
    background-color: #FFFFFF;
    margin-top: 10em;
}
.form-signin {
    padding: 20px;
}
.form-signin-heading {
    font-family: 'gotham-light';
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 24px;
    text-align: center;
}
.form-signin-subheading {
    font-family: 'gotham-bold';
    text-transform: uppercase;
    font-size: 12px;
    line-height: 24px;
    color: #1AA3FA;
    text-align: center;
    margin-top: 0;
    margin-bottom: 45px;
}
.form-signin label {
    font-family: 'gotham-light';
    font-weight: normal;
    font-size: 14px;
    color: #000;
    margin-bottom: 10px;
}
.form-signin .form-control:focus {
    z-index: 2;
}
.form-control {
    height: 40px;
    color: #000000;
    background-color: #E0E0E0;
    border-radius: 0;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    margin-bottom: 15px;
    font-family: 'gotham-medium';
    font-size: 16px;
}
.form-control:focus {
    border-color: #999999;
    outline: 0 none;
}
.btn-primary {
    margin-top: 30px;
    height: 50px;
    background-color: #FFB60E;
    border: 0;
    color: #393939;
    -webkit-box-shadow: -4px 4px 0px 0px #393939;
    -moz-box-shadow:    -4px 4px 0px 0px #393939;
    box-shadow:         -4px 4px 0px 0px #393939;
    border-radius: 0;
    font-family: 'gotham-bold';
    font-size: 18px;
}
.btn-primary:active {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    color: #FFFFFF;
    background-color: #999999;
    outline: 0 none;
}
.btn-primary:focus {
    outline: 0 none;
}
/*
Press state:
- no shadow
- white text
- bg 999999
*/
</style>
