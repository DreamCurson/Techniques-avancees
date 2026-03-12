import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Home from "../views/Home.vue";
import ForfaisView from "../views/ForfaisView.vue";
import AddForfaisView from "../views/AddForfaisView.vue";
import EditForfaisView from "../views/EditForfaisView.vue";
import AboutView from "../views/AboutView.vue";

const routes = [
  {
    path: "/index",
    name: "home",
    component: HomeView,
  },
  {
    path: "/",
    name: "start",
    component: Home,
  },
  {
    path: "/forfais/:id",
    name: "forfais",
    component: ForfaisView,
  },
  {
    path: "/forfais/add",
    name: "forfais_add",
    component: AddForfaisView,
  },
  {
    path: "/edit-forfais/:id",
    name: "edit-forfais",
    component: EditForfaisView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
