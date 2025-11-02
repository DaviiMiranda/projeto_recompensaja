import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../shared/models/project.model';

@Component({
  selector: 'app-explorar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css']
})
export class ExplorarComponent implements OnInit {
  projects = signal<Project[]>([]);
  filteredProjects = signal<Project[]>([]);
  searchTerm = signal('');
  selectedCategoria = signal('');
  
  categorias = [
    'Tecnologia',
    'Arte',
    'Sustentabilidade',
    'Comunidade',
    'Saúde',
    'Música',
    'Literatura',
    'Educação',
    'Esportes'
  ];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects.set(projects);
      this.applyFilters();
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoriaChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.projects();

    if (this.searchTerm()) {
      filtered = filtered.filter(p =>
        p.titulo.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        p.descricaoCurta.toLowerCase().includes(this.searchTerm().toLowerCase())
      );
    }

    

    this.filteredProjects.set(filtered);
  }

  getProgressPercentage(project: Project): number {
    return (project.valorArrecadado / project.metaValor) * 100;
  }

  getProgressBarColor(percentage: number): string {
    if (percentage >= 100) return 'bg-green-600';
    if (percentage >= 75) return 'bg-blue-600';
    if (percentage >= 50) return 'bg-indigo-600';
    return 'bg-yellow-600';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  getDaysLeft(dataLimite: Date | string): number {
    const data = new Date(dataLimite);
    const hoje = new Date();
    return Math.ceil((data.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
  }
}
