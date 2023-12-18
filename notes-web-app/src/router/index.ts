import { createRouter, createWebHistory } from 'vue-router'
import NewNoteView from '@/views/NewNoteView.vue'
import NoteView from '@/views/NoteView.vue'
import NotesView from '@/views/NotesView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      redirect: '/notes',
      children: [
        {
          path: '/notes',
          name: 'notes',
          component: NotesView
        },
        {
          path: '/new-note',
          name: 'newNote',
          component: NewNoteView
        },
        {
          path: '/note/:noteId',
          name: 'note',
          component: NoteView
        },
        {
          path: '/profile/:profileId',
          name: 'profile',
          component: ProfileView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

export default router
