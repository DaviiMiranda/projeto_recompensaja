import { Component, Input, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project, ProjectProgress } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent {
  @Input({ required: true }) set project(value: Project) {
    this._project.set(value);
  }

  private _project = signal<Project | null>(null);
  
  projectData = computed(() => this._project());
  
  progress = computed(() => {
    const project = this._project();
    if (!project) return null;
    
    return this.calculateProgress(project);
  });

  private calculateProgress(project: Project): ProjectProgress {
    const percentual = Math.min((project.valorArrecadado / project.metaValor) * 100, 100);
    const diasRestantes = this.calculateDaysRemaining(project.dataLimite);
    const atingiuMeta = project.valorArrecadado >= project.metaValor;

    return { percentual, diasRestantes, atingiuMeta };
  }

  private calculateDaysRemaining(dataLimite: Date | string): number {
    const hoje = new Date();
    const limite = new Date(dataLimite);
    const diffTime = limite.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  getProgressBarColor(percentual: number): string {
    if (percentual >= 75) return 'bg-green-500';
    if (percentual >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}
