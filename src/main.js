import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import router from './router';
import store from './store';
import App from './App';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
