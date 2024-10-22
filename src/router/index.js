import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/book/Home.vue'
import CreateBook from '../views/book/CreateBook.vue'
import EditBook from '../views/book/EditBook.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create',
      name: 'create',
      component: CreateBook
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditBook
    }
  ]
})

export default router
