import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import AddEvent from "@/components/AddEvent.vue";

import { useSessionStore } from "@/stores/session";

const DEFAULT_TITLE = "Ticken";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/login",
    //   name: "Login",
    //   component: LoginView,
    // },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        loggedInOnly: true,
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
      meta: {
        loggedInOnly: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.name?.toString() || DEFAULT_TITLE;
  next();
});

// router.beforeEach((to, from, next) => {
//   const session = useSessionStore();
//   if (to.meta.loggedInOnly && !session.isLoggedIn) {
//     next({ name: "Login" });
//   } else {
//     next();
//   }
// });

export default router;
