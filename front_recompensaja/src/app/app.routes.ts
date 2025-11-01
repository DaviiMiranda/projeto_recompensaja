import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.component').then(m => m.CadastroComponent)
  },
  {
    path: 'explorar',
    loadComponent: () => import('./pages/explorar/explorar.component').then(m => m.ExplorarComponent)
  },
  {
    path: 'criar-projeto',
    loadComponent: () => import('./pages/criar-projeto/criar-projeto.component').then(m => m.CriarProjetoComponent),
    canActivate: [authGuard]
  },
  {
    path: 'painel',
    loadComponent: () => import('./pages/painel/painel.component').then(m => m.PainelComponent),
    canActivate: [authGuard]
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

