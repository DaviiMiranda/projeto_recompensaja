import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../core/services/project.service';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { Project } from '../../models/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredProjects: Project[] = [];
  recentProjects: Project[] = [];
  isLoading = true;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getFeaturedProjects().subscribe(projects => {
      this.featuredProjects = projects;
    });

    this.projectService.getRecentProjects().subscribe(projects => {
      this.recentProjects = projects;
      this.isLoading = false;
    });
  }
}
