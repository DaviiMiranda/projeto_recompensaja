#!/bin/bash

# ProjectDetailsPage TS
cat > src/app/modules/projects/pages/project-details/project-details.page.ts << 'EOF'
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
EOF

# ProjectDetailsPage HTML
cat > src/app/modules/projects/pages/project-details/project-details.page.html << 'EOF'
@if (loading()) {
  <div class="loading-container">
    <div class="spinner"></div>
  </div>
} @else if (project(); as proj) {
  <div class="details-container">
    
    <!-- Coluna Esquerda -->
    <div class="details-left">
      <!-- Mídia Principal -->
      <div class="media-container">
        @if (proj.videoUrl) {
          <iframe 
            class="video-frame"
            [src]="proj.videoUrl" 
            frameborder="0" 
            allowfullscreen
          ></iframe>
        } @else {
          <img [src]="proj.imagemUrl" [alt]="proj.titulo" class="main-image" />
        }
      </div>

      <!-- Tabs -->
      <div class="tabs-container">
        <button 
          class="tab" 
          [class.tab-active]="activeTab() === 'description'"
          (click)="changeTab('description')"
        >
          Descrição
        </button>
        <button 
          class="tab"
          [class.tab-active]="activeTab() === 'updates'"
          (click)="changeTab('updates')"
        >
          Atualizações
        </button>
        <button 
          class="tab"
          [class.tab-active]="activeTab() === 'comments'"
          (click)="changeTab('comments')"
        >
          Comentários
        </button>
      </div>

      <!-- Conteúdo das Tabs -->
      <div class="tab-content">
        @if (activeTab() === 'description') {
          <div class="description-content">
            <h2 class="content-title">Sobre o Projeto</h2>
            <p class="content-text">{{ proj.descricaoCompleta }}</p>
            
            <h3 class="content-subtitle">Sobre o Criador</h3>
            <div class="creator-info">
              <img 
                [src]="proj.criadorFoto || 'https://ui-avatars.com/api/?name=' + proj.criadorNome"
                [alt]="proj.criadorNome"
                class="creator-avatar"
              />
              <div>
                <p class="creator-name">{{ proj.criadorNome }}</p>
                <p class="creator-role">Criador do Projeto</p>
              </div>
            </div>
          </div>
        }
        
        @if (activeTab() === 'updates') {
          <div class="empty-tab">
            <p>📢 Nenhuma atualização por enquanto</p>
          </div>
        }
        
        @if (activeTab() === 'comments') {
          <div class="empty-tab">
            <p>💬 Nenhum comentário ainda. Seja o primeiro!</p>
          </div>
        }
      </div>
    </div>

    <!-- Coluna Direita (Sticky) -->
    <aside class="details-right">
      <div class="sidebar-sticky">
        
        <h1 class="project-title">{{ proj.titulo }}</h1>
        <p class="project-short-desc">{{ proj.descricaoCurta }}</p>

        <!-- Progresso -->
        <div class="progress-section">
          <div class="progress-bar-container">
            <div 
              class="progress-bar-fill"
              [style.width.%]="getProgress()"
            ></div>
          </div>
          <p class="progress-text">{{ getProgress().toFixed(0) }}% da meta</p>
        </div>

        <!-- Stats -->
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">{{ formatCurrency(proj.valorArrecadado) }}</span>
            <span class="stat-label">arrecadado de {{ formatCurrency(proj.metaValor) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ proj.numeroApoiadores }}</span>
            <span class="stat-label">apoiadores</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ getDaysRemaining() }}</span>
            <span class="stat-label">dias restantes</span>
          </div>
        </div>

        <!-- Recompensas -->
        <div class="rewards-section">
          <h3 class="rewards-title">Escolha sua Recompensa</h3>
          <div class="rewards-list">
            <app-reward-card
              *ngFor="let reward of rewards()"
              [reward]="reward"
              [selected]="selectedReward()?.id === reward.id"
              (selectReward)="selectReward($event)"
            />
          </div>
        </div>

        <!-- Botão de Apoiar -->
        <app-button
          buttonStyle="primary"
          size="lg"
          [fullWidth]="true"
          [disabled]="!selectedReward()"
          (clicked)="supportProject()"
        >
          {{ selectedReward() ? 'Apoiar com ' + formatCurrency(selectedReward()!.valorMinimo) : 'Selecione uma Recompensa' }}
        </app-button>

      </div>
    </aside>

  </div>
}
EOF

echo "✅ ProjectDetailsPage criado!"
