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
    },
    {
        path: "/Compte",
        name: "Compte",
        component: () => import("../views/Compte"),
    },
    {
        path: "/Admin",
        name: "Admin",
        component: () => import("../views/Admin"),
    },
    {
        path: "/UsersList",
        name: "UsersList",
        component: () => import("../views/UsersList")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ["/", "/inscription"]
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem("userId")
    const loggedToken = localStorage.getItem("token")
    if (authRequired && !loggedIn && !loggedToken) {
        return next("/")
    }
    next()
})

export default router