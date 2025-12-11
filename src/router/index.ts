import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'FCyT UMSS - Facultad de Ciencias y Tecnología',
        breadcrumb: 'Inicio'
      }
    },
    {
      path: '/nosotros',
      name: 'institutional',
      component: () => import('@/views/InstitutionalView.vue'),
      meta: {
        title: 'Nosotros - FCyT UMSS',
        breadcrumb: 'Nosotros'
      }
    },
    {
      path: '/calendario',
      name: 'calendar',
      component: () => import('@/views/CalendarView.vue'),
      meta: {
        title: 'Calendario Académico - FCyT UMSS',
        breadcrumb: 'Calendario'
      }
    },
    {
      path: '/horarios',
      name: 'schedules',
      component: () => import('@/views/SchedulesView.vue'),
      meta: {
        title: 'Horarios - FCyT UMSS',
        breadcrumb: 'Horarios'
      }
    },
    {
      path: '/admision',
      name: 'admissions',
      component: () => import('@/views/AdmissionsView.vue'),
      meta: {
        title: 'Admisión - FCyT UMSS',
        breadcrumb: 'Admisión'
      }
    },
    {
      path: '/noticias',
      name: 'news',
      component: () => import('@/views/NewsView.vue'),
      meta: {
        title: 'Noticias - FCyT UMSS',
        breadcrumb: 'Noticias'
      }
    },
    {
      path: '/noticias/:id',
      name: 'news-detail',
      component: () => import('@/views/NewsDetailView.vue'),
      meta: {
        title: 'Noticia - FCyT UMSS',
        breadcrumb: 'Noticia'
      }
    },
    {
      path: '/contacto',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: {
        title: 'Contacto - FCyT UMSS',
        breadcrumb: 'Contacto'
      }
    },
    {
      // Catch-all redirect to home
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Handle hash links (e.g., /#calendar)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80 // Offset for fixed header
      }
    }

    // Restore scroll position on back/forward
    if (savedPosition) {
      return savedPosition
    }

    // Scroll to top on new page
    return { top: 0, behavior: 'smooth' }
  }
})

// Update document title on navigation
router.beforeEach((to, from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = title
  }
  next()
})

export default router
