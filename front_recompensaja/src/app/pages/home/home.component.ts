import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="container mx-auto px-4 py-12">
      <div class="text-center">
        <h1 class="text-5xl font-bold text-gray-800 mb-6">
          Bem-vindo ao RecompensaJá
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Conectamos criadores com apoiadores para transformar ideias em realidade
        </p>
        <div class="flex justify-center gap-4">
          <a
            routerLink="/explorar"
            class="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Explorar Projetos
          </a>
          <a
            routerLink="/criar-projeto"
            class="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
          >
            Criar Projeto
          </a>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {}
