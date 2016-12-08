import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home';
import MyReviews from './components/MyReviews';
import DoReview from './components/DoReview';
import AdminCards from './components/admin/Cards';
import AdminUsers from './components/admin/Users';
import AdminReviews from './components/admin/Reviews';

const routes = [{
    path: '/',
    component: Home,
    name: 'home'
}, {
    path: '/my/reviews',
    component: MyReviews,
    name: 'myReviews'
}, {
    path: '/my/reviews/:id',
    component: DoReview,
    name: 'doReview'
}, {
    path: '/admin/cards',
    component: AdminCards,
    name: 'adminCards'
}, {
    path: '/admin/users',
    component: AdminUsers,
    name: 'adminUsers'
}, {
    path: '/admin/reviews',
    component: AdminReviews,
    name: 'adminReviews'
}];

Vue.use(VueRouter);

export default new VueRouter({
    routes,
    linkActiveClass: 'active'
});

