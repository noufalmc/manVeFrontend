import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPageView from '@/views/LoginPageView.vue'
import UserHome from '@/views/Dashboard/UserHome.vue'
import AddUserScape from '@/views/Dashboard/AddUserScape.vue'

const routes = [
  {
    path: '/register',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'login',
    component: LoginPageView
  },
  {
    path: '/dashboard',
    name: 'userhome',
    component: UserHome,
    meta: {
      requiresAuth : true
    }
  },
  {
    path: '/add-user-scape',
    name: 'addUserScape',
    component: AddUserScape,
    meta: {
      requiresAuth : true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.meta.requiresAuth)
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token")
    if (token)
    {
      next()
    }
    else{
      next('/')
    }
  }
  else{
    next()
  }
})

export default router
