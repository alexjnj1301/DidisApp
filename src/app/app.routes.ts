import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  { path: 'lesson/:id', loadComponent: () => import('./pages/lesson/lesson.component').then(m => m.LessonComponent) },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
]
