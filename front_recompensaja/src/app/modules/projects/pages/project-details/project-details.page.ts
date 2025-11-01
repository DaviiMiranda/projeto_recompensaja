import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../../shared/models/project.model';
import { Reward } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ProjectCardComponent } from '../../../../shared/components/project-card/project-card.component';
import { RewardCardComponent } from '../../components/reward-card/reward-card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-project-details-page',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, RewardCardComponent, ButtonComponent],
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.css']
})
export class ProjectDetailsPage implements OnInit {
  project = signal<Project | undefined>(undefined);
  rewards = signal<Reward[]>([]);
  selectedReward = signal<Reward | undefined>(undefined);
  loading = signal(true);
  activeTab = signal<'description' | 'updates' | 'comments'>('description');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProject(id);
  }

  private loadProject(id: number): void {
    this.loading.set(true);

    this.projectService.getProjectById(id).subscribe(project => {
      if (!project) {
        this.router.navigate(['/']);
        return;
      }

      this.project.set(project);
      
      this.projectService.getRewardsByProjectId(id).subscribe(rewards => {
        this.rewards.set(rewards);
        this.loading.set(false);
      });
    });
  }

  selectReward(reward: Reward): void {
    this.selectedReward.set(reward);
  }

  supportProject(): void {
    const reward = this.selectedReward();
    const project = this.project();
    
    if (!reward || !project) {
      alert('Por favor, selecione uma recompensa');
      return;
    }

    this.projectService.supportProject(project.id, reward.id, reward.valorMinimo).subscribe({
      next: () => {
        alert('Apoio realizado com sucesso! Em breve você receberá um email de confirmação.');
        this.selectedReward.set(undefined);
      },
      error: () => {
        alert('Erro ao processar apoio. Tente novamente.');
      }
    });
  }

  changeTab(tab: 'description' | 'updates' | 'comments'): void {
    this.activeTab.set(tab);
  }

  getProgress(): number {
    const proj = this.project();
    if (!proj) return 0;
    return Math.min((proj.valorArrecadado / proj.metaValor) * 100, 100);
  }

  getDaysRemaining(): number {
    const proj = this.project();
    if (!proj) return 0;
    
    const hoje = new Date();
    const limite = new Date(proj.dataLimite);
    const diffTime = limite.getTime() - hoje.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
}
