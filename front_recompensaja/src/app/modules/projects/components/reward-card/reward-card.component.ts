import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reward } from '../../models/project.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-reward-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './reward-card.component.html',
  styleUrls: ['./reward-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardCardComponent {
  @Input({ required: true }) reward!: Reward;
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;

  @Output() selectReward = new EventEmitter<Reward>();

  get isAvailable(): boolean {
    if (!this.reward.quantidadeLimitada) return true;
    return (this.reward.quantidadeDisponivel || 0) > 0;
  }

  get isSoldOut(): boolean {
    return this.reward.quantidadeLimitada && !this.isAvailable;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  onSelect(): void {
    if (!this.disabled && this.isAvailable) {
      this.selectReward.emit(this.reward);
    }
  }
}
