/* eslint-disable */
import {createRouter, createWebHistory} from "vue-router";
import routes from "@/router/routes";
import store from "@/store";
import {log10} from "chart.js/helpers";

const router = createRouter({
    routes,
    base: "/mob_app/",
    history: createWebHistory(process.env.BASE_URL)
})

export default router