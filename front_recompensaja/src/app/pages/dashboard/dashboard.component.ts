import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserProjectService } from '../../core/services/user-project.service';
import { AuthService } from '../../core/services/auth.service';
import { Project } from '../../models/interfaces';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedFilter: string = 'all';
  isLoading = true;

  constructor(
    private userProjectService: UserProjectService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser) {
      this.userProjectService.getUserProjects(currentUser.id).subscribe(projects => {
        this.projects = projects;
        this.filterProjects();
        this.isLoading = false;
      });
    }
  }

  filterProjects(): void {
    if (this.selectedFilter === 'all') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => p.status === this.selectedFilter);
    }
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.filterProjects();
  }

  deleteProject(id: string): void {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      this.userProjectService.deleteProject(id).subscribe(() => {
        this.loadProjects();
      });
    }
  }

  getStatusBadgeClass(status?: string): string {
    const classes: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'draft': 'bg-blue-100 text-blue-800',
      'funded': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-gray-100 text-gray-800'
    };
    return classes[status || 'draft'] || classes['draft'];
  }

  getStatusLabel(status?: string): string {
    const labels: Record<string, string> = {
      'active': 'Ativo',
      'draft': 'Rascunho',
      'funded': 'Financiado',
      'completed': 'Encerrado'
    };
    return labels[status || 'draft'] || 'Rascunho';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  getProgressPercentage(project: Project): number {
    return Math.min((project.raisedAmount / project.goalAmount) * 100, 100);
  }
}
