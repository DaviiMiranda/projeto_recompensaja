import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'explore',
    loadComponent: () => import('./pages/explore/explore.component').then(m => m.ExploreComponent)
  },
  {
    path: 'project/:id',
    loadComponent: () => import('./pages/project-details/project-details.component').then(m => m.ProjectDetailsComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/edit-profile/edit-profile.component').then(m => m.EditProfileComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'create-project',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/create-project/create-project.component').then(m => m.CreateProjectComponent)
  },
  { path: '**', redirectTo: '' }
];
