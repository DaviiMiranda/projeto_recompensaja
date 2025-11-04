import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project } from '../../../models/interfaces';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
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

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}
