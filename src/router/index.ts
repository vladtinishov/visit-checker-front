import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import HomeView from '../views/HomeView.vue'
// @ts-ignore
import SigninView from "@/views/SigninView.vue";
// @ts-ignore
import MainView from "@/views/MainView.vue";
// @ts-ignore
import RoomsListView from "@/views/RoomsListView.vue";
// @ts-ignore
import LoginView from "@/views/LoginView.vue";
// @ts-ignore
import ReportsView from "@/views/ReportsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView
    },
    {
      path: '/main',
      name: 'main',
      component: MainView
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomsListView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsView
    },
  ]
})

export default router
