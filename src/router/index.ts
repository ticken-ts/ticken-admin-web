import { createRouter, createWebHistory } from "vue-router";

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
      component: () => import("@/views/HomeView.vue"),
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
    {
      path: "/add-event",
      name: "add-event",
      component: () => import("@/views/AddEvent.vue"),
      meta: {
        loggedInOnly: true,
      },
    },
    {
      path: "/organization/:organizationID/event/:eventID",
      name: "event",
      component: () => import("@/views/EventView.vue"),
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
