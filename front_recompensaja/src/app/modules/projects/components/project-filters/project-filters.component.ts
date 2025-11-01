import { Component, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectFilters } from '../../models/project.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-project-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './project-filters.component.html',
  styleUrls: ['./project-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFiltersComponent {
  @Output() filtersChanged = new EventEmitter<ProjectFilters>();

  categorias = signal<string[]>([]);
  status = signal<string[]>([]);
  ordenacao = signal<string>('recente');
  busca = signal<string>('');

  availableCategories = [
    'Tecnologia',
    'Arte',
    'Comunidade',
    'Sustentabilidade',
    'Educação',
    'Saúde'
  ];

  availableStatus = [
    { value: 'ATIVO', label: 'Ativos' },
    { value: 'SUCESSO', label: 'Bem-sucedidos' },
    { value: 'FALHOU', label: 'Não financiados' }
  ];

  sortOptions = [
    { value: 'recente', label: 'Mais recentes' },
    { value: 'popular', label: 'Mais populares' },
    { value: 'financiamento', label: 'Mais financiados' },
    { value: 'nome', label: 'Nome (A-Z)' }
  ];

  toggleCategory(categoria: string): void {
    const current = this.categorias();
    const index = current.indexOf(categoria);
    
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(categoria);
    }
    
    this.categorias.set([...current]);
    this.emitFilters();
  }

  isCategorySelected(categoria: string): boolean {
    return this.categorias().includes(categoria);
  }

  toggleStatus(statusValue: string): void {
    const current = this.status();
    const index = current.indexOf(statusValue);
    
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(statusValue);
    }
    
    this.status.set([...current]);
    this.emitFilters();
  }

  isStatusSelected(statusValue: string): boolean {
    return this.status().includes(statusValue);
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as any;
    this.ordenacao.set(value);
    this.emitFilters();
  }

  onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.busca.set(value);
    this.emitFilters();
  }

  clearFilters(): void {
    this.categorias.set([]);
    this.status.set([]);
    this.ordenacao.set('recente');
    this.busca.set('');
    this.emitFilters();
  }

  private emitFilters(): void {
    const filters: ProjectFilters = {
      categorias: this.categorias().length > 0 ? this.categorias() : undefined,
      status: this.status().length > 0 ? this.status() : undefined,
      ordenacao: this.ordenacao() as any,
      busca: this.busca() || undefined
    };

    this.filtersChanged.emit(filters);
  }
}
