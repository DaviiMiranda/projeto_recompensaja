import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import { Project, Reward } from '../../models/interfaces';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;
  selectedReward: Reward | null = null;
  isLoading = true;
  showSupportModal = false;
  quantity = 1;
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadProject(id);
    });
  }

  loadProject(id: string): void {
    this.isLoading = true;
    this.projectService.getProjectById(id).subscribe({
      next: (project) => {
        this.project = project || null;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  selectReward(reward: Reward | null): void {
    this.selectedReward = reward;
    this.showSupportModal = true;
    this.quantity = 1;
  }

  closeModal(): void {
    this.showSupportModal = false;
    this.selectedReward = null;
  }

  supportProject(): void {
    alert(`Você apoiou com ${this.quantity} unidade(s) da recompensa "${this.selectedReward?.title}"`);
    this.closeModal();
  }

  getProgressPercentage(): number {
    if (!this.project) return 0;
    return Math.min((this.project.raisedAmount / this.project.goalAmount) * 100, 100);
  }

  getDaysRemaining(): number {
    if (!this.project) return 0;
    const today = new Date();
    const deadline = new Date(this.project.deadline);
    const diff = deadline.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  isProjectActive(): boolean {
    return this.getDaysRemaining() > 0 && (this.project?.status === 'active' || !this.project?.status);
  }
}
