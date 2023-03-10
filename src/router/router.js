/* eslint-disable */
import {createRouter, createWebHistory} from "vue-router";
import routes from "@/router/routes";
import store from "@/store";

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

// Для упрощения укажем это в переменной
const isAuthenticated = store.getters.isAuth
// const isAuthenticated = false

console.log(isAuthenticated,'isAuthenticated')
console.log(store.state.auth,'store.state.auth')

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !isAuthenticated) {
        // console.log("isAuthenticated")
        return { name: 'hello' }
    }
})

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