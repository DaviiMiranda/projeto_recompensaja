import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../shared/models/project.model';
import { Reward } from '../../shared/models/reward.model';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project = signal<Project | null>(null);
  selectedReward = signal<Reward | null>(null);

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe(project => {
        this.project.set(project);
      });
    }
  }

  selectReward(reward: Reward): void {
    this.selectedReward.set(reward);
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

  getProgressPercentage(project: Project): number {
    return (project.valorArrecadado / project.metaValor) * 100;
  }
}
