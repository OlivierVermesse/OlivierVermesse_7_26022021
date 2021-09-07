import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "Connexion",
        component: () => import("../views/Connexion"),
    },
    {
        path: "/inscription",
        name: "Inscription",
        component: () => import("../views/Inscription")
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("../views/Home")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router