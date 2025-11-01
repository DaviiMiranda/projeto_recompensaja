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
