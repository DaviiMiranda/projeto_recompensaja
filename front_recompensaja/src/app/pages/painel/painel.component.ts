import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-painel',
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-8">Meu Painel</h1>
      
      @if (currentUser$ | async; as user) {
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div class="flex items-center space-x-4">
            <img
              [src]="user.avatar || 'https://ui-avatars.com/api/?name=' + user.nome"
              [alt]="user.nome"
              class="w-20 h-20 rounded-full"
            />
            <div>
              <h2 class="text-2xl font-bold text-gray-800">{{ user.nome }}</h2>
              <p class="text-gray-600">{{ user.email }}</p>
              <div class="flex gap-2 mt-2">
                @for (role of user.roles; track role) {
                  <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    {{ role }}
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
      }

      <p class="text-gray-600">Em breve: dashboard completo com estatísticas e projetos</p>
    </div>
  `
})
export class PainelComponent {
  constructor(private authService: AuthService) {}

  get currentUser$() {
    return this.authService.currentUser$;
  }
}
