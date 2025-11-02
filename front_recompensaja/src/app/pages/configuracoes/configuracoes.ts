import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [],
  templateUrl: './configuracoes.html',
  styleUrl: './configuracoes.css'
})
export class ConfiguracoesComponent {
  isDarkMode = signal(false);

  toggleDarkMode(): void {
    this.isDarkMode.set(!this.isDarkMode());
    // Aqui você adicionaria a lógica para aplicar o tema escuro
    console.log('Modo escuro:', this.isDarkMode());
  }
}