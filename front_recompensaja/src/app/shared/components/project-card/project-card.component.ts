import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../../models/interfaces';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  @Input() project!: Project;

  get progressPercentage(): number {
    return Math.min((this.project.raisedAmount / this.project.goalAmount) * 100, 100);
  }

  get daysRemaining(): number {
    const today = new Date();
    const deadline = new Date(this.project.deadline);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  get formattedRaisedAmount(): string {
    return this.formatCurrency(this.project.raisedAmount);
  }

  get formattedGoalAmount(): string {
    return this.formatCurrency(this.project.goalAmount);
  }

  get formattedPublishedDate(): string {
    const date = new Date(this.project.publishedDate);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}
