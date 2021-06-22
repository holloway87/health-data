import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sleep-tracker",
    name: "Sleep tracker",
    component: () =>
      import(
        /* webpackChunkName: "sleep-tracker" */ "../views/SleepTracker.vue"
      ),
  },
  {
    path: "/habit-tracker",
    name: "Habit tracker",
    component: () =>
      import(
        /* webpackChunkName: "habit-tracker" */ "../views/HabitTracker.vue"
      ),
  },
  {
    path: "/weight-tracker",
    name: "Weight tracker",
    component: () =>
      import(
        /* webpackChunkName: "weight-tracker" */ "../views/WeightTracker.vue"
      ),
  },
  {
    path: "/todo-list",
    name: "Todo list",
    component: () =>
      import(/* webpackChunkName: "to-do-list" */ "../views/TodoList.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
