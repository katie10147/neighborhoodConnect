import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Main from "./views/Main.vue";
import About from "./views/About.vue";
import SignIn from "./views/SignIn.vue";
import SignUp from "./views/SignUp.vue";
import CreateRequest from "./views/CreateRequest.vue"
import Settings from "./views/Settings.vue";
import FollowRequests from "./views/FollowRequests.vue";
import vuetify from './plugins/vuetify'
import VueCookie from 'vue-cookie';

Vue.use(VueCookie);

export const eventBus = new Vue();

Vue.config.productionTip = false;

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    { path: "/feed", component: Main, props: true },
    { path: "/", component: About, props: true },
    { path: "/login", component: SignIn, props: true },
    { path: "/signup", component: SignUp, props: true },
    { path: "/createrequest", component: CreateRequest, props: true },
    { path: "/settings", component: Settings, props: true },
    {path: "/following", component: FollowRequests, props: true},

  ],
});

new Vue({
  el: "#app",
  router,
  vuetify,
  render: (h) => h(App)
});





