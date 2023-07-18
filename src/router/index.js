import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cards',
      name: 'cards',
      component: () => import('../views/CardsView.vue')
    },
    {
      path: '/card/:id',
      name: 'card',
      component: () => import('../views/CardView.vue')
    },
    {
      path: '/places',
      name: 'places',
      component: () => import('../views/PlacesView.vue')
    },
    {
      path: '/place/:id',
      name: 'place',
      component: () => import('../views/PlaceView.vue')
    },
    {
      path: '/offers',
      name: 'offers',
      component: () => import('../views/OffersView.vue')
    },
    {
      path: '/offer/:id',
      name: 'offer',
      component: () => import('../views/OfferView.vue')
    }
/*     {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
  ]
})

export default router
