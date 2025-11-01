import { Routes } from '@angular/router';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'explore',
    loadComponent: () => import('./pages/explore/explore.page').then(m => m.ExplorePage)
  },
  {
    path: 'project/:id',
    loadComponent: () => import('./pages/project-details/project-details.page').then(m => m.ProjectDetailsPage)
  }
];
