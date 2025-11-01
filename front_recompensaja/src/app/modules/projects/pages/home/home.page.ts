import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../shared/models/project.model';
import { ProjectService } from '../../services/project.service';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ProjectCardComponent } from '../../../../shared/components/project-card/project-card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroSectionComponent, ProjectCardComponent, ButtonComponent],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {
  featuredProjects = signal<Project[]>([]);
  recentProjects = signal<Project[]>([]);
  loading = signal(true);

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.loading.set(true);

    this.projectService.getFeaturedProjects().subscribe(projects => {
      this.featuredProjects.set(projects);
    });

    this.projectService.getRecentProjects().subscribe(projects => {
      this.recentProjects.set(projects);
      this.loading.set(false);
    });
  }
}
