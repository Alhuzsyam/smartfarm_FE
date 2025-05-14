import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/LoginComponent.vue'
import RegComponent from '../components/RegComponent.vue'
import AuthComponent from '@/components/AuthComponent.vue'
import DashboardComponent from '@/components/DashboardComponent.vue'
import NotFoundComponent from '@/components/NotFoundComponent.vue'
import CensorComponent from '@/components/CensorComponent.vue'
import ControlComponent from '@/components/ControlComponent.vue'
import SettingComponent from '@/components/SettingComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: AuthComponent,
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginComponent,
        },
        {
          path: 'signup',
          name: 'signup',
          component: RegComponent,
        },
        {
          path: '',
          redirect: 'auth/login',
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardComponent,
      children: [
        {
          path: 'monitor',
          name: 'monitor',
          component: CensorComponent,
        },
        {
          path: 'control',
          name: 'control',
          component: ControlComponent,
        },
        {
          path: 'setting',
          name: 'setting',
          component: SettingComponent,
        },
      ],
    },
    {
      path: '',
      redirect: 'auth/login',
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
  ],
})
// ✅ Navigation Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.path.startsWith('/dashboard') && !isLoggedIn) {
    return next('/auth/login')
  }

  if ((to.path.startsWith('/auth') || to.name === 'login' || to.name === 'signup') && isLoggedIn) {
    return next('/dashboard/monitor')
  }

  next()
})

export default router
