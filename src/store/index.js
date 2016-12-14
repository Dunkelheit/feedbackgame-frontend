import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

document.body.className = localStorage.feedbackAppToken ? 'logged-in' : 'logged-out';

export default new Vuex.Store({
    state: {
        loggedIn: localStorage.feedbackAppToken,
        role: localStorage.feedbackAppRole
    },
    mutations: {
        login(state, data) {
            state.loggedIn = data.token;
            state.role = data.role;
        },
        logout(state) {
            state.loggedIn = false;
            state.role = 'user';
        }
    }
});
