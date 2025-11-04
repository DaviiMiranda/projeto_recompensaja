import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reward } from '../../../models/interfaces';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-reward-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './reward-card.component.html',
  styleUrl: './reward-card.component.css'
})
export class RewardCardComponent {
  @Input() reward!: Reward;
  @Output() onSupport = new EventEmitter<Reward>();

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  }

  handleSupport(): void {
    this.onSupport.emit(this.reward);
  }
}
