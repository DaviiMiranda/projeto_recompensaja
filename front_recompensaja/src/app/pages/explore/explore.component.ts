import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { Project } from '../../models/interfaces';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectCardComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  projects: Project[] = [];
  allProjects: Project[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  isLoading = true;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categories = this.projectService.getCategories();
    
    // Get search term from query params
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.loadProjects();
    });
  }

  loadProjects(): void {
    this.isLoading = true;
    this.projectService.getAllProjects().subscribe(projects => {
      this.allProjects = projects;
      this.filterProjects();
      this.isLoading = false;
    });
  }

  filterProjects(): void {
    this.projectService.filterProjects(this.selectedCategory, this.searchTerm)
      .subscribe(filtered => {
        this.projects = filtered;
      });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category === this.selectedCategory ? '' : category;
    this.filterProjects();
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.searchTerm = '';
    this.filterProjects();
  }
}
