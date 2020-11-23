import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  // ここを追加
  {
    path: "/master/material",
    name: "MaterialMaster",
    component: () =>
      import(
        /* webpackChunkName: "currency" */ "../views/master/MaterialMaster.vue"
      ),
    meta: { requiresAuth: true }
  },
  {
    path: "/plan/plan",
    name: "Plan",
    component: () =>
      import(/* webpackChunkName: "currency" */ "../views/plan/Plan.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/plan/NewPlan",
    name: "NewPlan",
    component: () =>
      import(/* webpackChunkName: "currency" */ "../views/plan/NewPlan.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Signup.vue")
  },
  {
    path: "/signin",
    name: "Signin",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/Signin.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        next();
      } else {
        next({
          path: "/signin",
          query: { redirect: to.fullPath }
        });
      }
    });
  } else {
    next(); // next() を常に呼び出すようにしてください!
  }
});

export default router;
