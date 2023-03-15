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

// Для упрощения укажем это в переменной
// const isAuthenticated = store.getters.isAuth
// // const isAuthenticated = false
//
// console.log(isAuthenticated,'isAuthenticated')
// console.log(store.state.auth,'store.state.auth')

// console.log('store.state.auth.isAuth', store.state.auth.isAuth)
//


// router.beforeEach((to, from, next) => {
//     console.log('store.state.auth.isAuth2', store.state.auth.isAuth)
//     if (store.state.auth.isAuth) {
//         // console.log("isAuthenticated")
//         // next({name: 'main'})
//         console.log('re main')
//     } else {
//         // next({name: 'start'})
//         console.log('re start')
//     }
// })

// router.beforeEach((next) => {
//
//     console.log(store)
//     console.log(store.getters.isAuth)
//     // console.log(to.matched.some((route) => {return route}))
//     // console.log(from())
//     console.log(next())
//
//     if (store.getters.isAuth) {
//                 next();
//             } else {
//                 next("/hello");
//             }
//
//     // if (to.matched.some((route) => route.meta?.requiresAuth)) {
//     //     if (store.auth) {
//     //         next();
//     //     } else {
//     //         next("/auth-required");
//     //     }
//     // } else {
//     //     next();
//     // }
// });

export default router