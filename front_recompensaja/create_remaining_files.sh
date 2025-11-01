#!/bin/bash

# ExplorePage TypeScript
cat > src/app/modules/projects/pages/explore/explore.page.ts << 'EOF'
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../../shared/models/project.model';
import { ProjectFilters } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ProjectFiltersComponent } from '../../components/project-filters/project-filters.component';
import { ProjectCardComponent } from '../../../../shared/components/project-card/project-card.component';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  imports: [CommonModule, ProjectFiltersComponent, ProjectCardComponent],
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.css']
})
export class ExplorePage implements OnInit {
  projects = signal<Project[]>([]);
  loading = signal(true);
  currentFilters = signal<ProjectFilters>({});

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  onFiltersChange(filters: ProjectFilters): void {
    this.currentFilters.set(filters);
    this.loadProjects();
  }

  private loadProjects(): void {
    this.loading.set(true);
    
    this.projectService.getProjectsByFilters(this.currentFilters()).subscribe(projects => {
      this.projects.set(projects);
      this.loading.set(false);
    });
  }
}
EOF

# ExplorePage HTML
cat > src/app/modules/projects/pages/explore/explore.page.html << 'EOF'
<div class="explore-container">
  
  <!-- Filtros (Sidebar) -->
  <aside class="explore-sidebar">
    <app-project-filters (filtersChanged)="onFiltersChange($event)" />
  </aside>

  <!-- Área Principal -->
  <main class="explore-main">
    <div class="explore-header">
      <h1 class="explore-title">Explorar Projetos</h1>
      <p class="explore-count">
        @if (!loading()) {
          {{ projects().length }} projeto(s) encontrado(s)
        }
      </p>
    </div>

    @if (loading()) {
      <div class="projects-grid">
        <div class="skeleton-card" *ngFor="let i of [1,2,3,4,5,6]"></div>
      </div>
    } @else if (projects().length === 0) {
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">Nenhum projeto encontrado</h3>
        <p class="empty-text">Tente ajustar os filtros para ver mais resultados</p>
      </div>
    } @else {
      <div class="projects-grid">
        <app-project-card 
          *ngFor="let project of projects()"
          [project]="project"
        />
      </div>
    }
  </main>

</div>
EOF

# ExplorePage CSS
cat > src/app/modules/projects/pages/explore/explore.page.css << 'EOF'
.explore-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .explore-container {
    grid-template-columns: 300px 1fr;
  }
}

.explore-sidebar {
  order: 2;
}

@media (min-width: 1024px) {
  .explore-sidebar {
    order: 1;
    position: sticky;
    top: 2rem;
    height: fit-content;
  }
}

.explore-main {
  order: 1;
}

@media (min-width: 1024px) {
  .explore-main {
    order: 2;
  }
}

.explore-header {
  margin-bottom: 2rem;
}

.explore-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.explore-count {
  font-size: 1rem;
  color: #6b7280;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.skeleton-card {
  height: 400px;
  background: linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: 0.75rem;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.empty-text {
  font-size: 1rem;
  color: #6b7280;
}
EOF

echo "✅ Arquivos criados com sucesso!"
