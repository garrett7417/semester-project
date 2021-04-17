import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Login from "./components/Login.vue";
import HomePage from "./components/HomePage.vue";
import Rent from "./components/Rent.vue";
import RentalConfirmation from "./components/RentalConfirmation.vue";
import BoatManagement from "./components/BoatManagement.vue";
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

    {
        name: "Rent",
        path: "/rent",
        component: Rent,
    },

    {
        name: "RentalConfirmation",
        path: "/rentalconfirmation",
        component: RentalConfirmation,
    },

    {
        name: "BoatManagement",
        path: "/management",
        component: BoatManagement,
    },
];

export const AppRouter = new VueRouter({
    routes: myRoutes,
    mode: "history"
});