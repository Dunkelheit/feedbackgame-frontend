<template>
    <div>
        <div class="page-header">
            <h1>Users</h1>
        </div>
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div v-if="error" class="alert alert-danger" role="alert">
            <strong>Oh snap!</strong> Something went wrong.
        </div>
        <div v-if="users.length > 0" class="content">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td>{{user.fullName}}</td>
                        <td>{{user.username}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.jobTitle}}</td>
                        <td>{{user.department}}</td>
                        <td>{{user.company}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'users',
    data () {
        return {
            loading: false,
            users: [],
            error: null
        };
    },
    created() {
        this.fetchUsers();
    },
    watch: {
        '$route': 'fetchUsers'
    },
    methods: {
        fetchUsers() {
            this.error = null;
            this.users = [];
            this.loading = true;
            axios.get('/api/users', {
                headers: {
                    'x-auth-token': this.$store.state.loggedIn
                }
            }).then(response => {
                this.loading = false;
                this.users = response.data;
            }).catch(error => {
                if (error.response.status === 401) {
                    this.$router.replace({ name: 'home' });
                } else {
                    this.error = error;
                }
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
