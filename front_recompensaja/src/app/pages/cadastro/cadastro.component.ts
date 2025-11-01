import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [RouterLink],
  template: `
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Cadastro</h2>
        <p class="text-gray-600 text-center mb-4">Em breve: formulário de cadastro completo</p>
        <div class="text-center">
          <a routerLink="/login" class="text-indigo-600 hover:text-indigo-800 font-medium">
            Já tem uma conta? Faça login
          </a>
        </div>
      </div>
    </div>
  `
})
export class CadastroComponent {}
