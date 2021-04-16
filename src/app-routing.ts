import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Login from "./components/Login.vue";
import HomePage from "./components/HomePage.vue";
import { component } from "vue/types/umd";
import { hasProto } from "vue-class-component/lib/util";
Vue.use(VueRouter);

const myRoutes: Array<RouteConfig> = [
    {
        name: "Login",
        path: "/",
        component: Login,
    },

    {
        name: "Home",
        path: "/home",
        component: HomePage,
    },
];

export const AppRouter = new VueRouter({
    routes: myRoutes,
    mode: "history"
});