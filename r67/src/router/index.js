// router/index.js or router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import RecipeList from "../components/RecipeList.vue"; // Adjust paths
import RecipeDetail from "../components/RecipeDetail.vue";

const routes = [
  { path: "/", component: RecipeList },
  { path: "/recipe/:id", component: RecipeDetail, props: true }, // Pass route params as props
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
