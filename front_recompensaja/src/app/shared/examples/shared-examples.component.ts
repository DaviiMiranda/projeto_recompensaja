import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent, InputComponent, ProjectCardComponent } from '../index';
import { Project, ProjectStatus } from '../models/project.model';

/**
 * Componente de exemplo demonstrando o uso dos componentes do SharedModule
 * 
 * Este arquivo pode ser usado como referência ou até mesmo como página de
 * demonstração dos componentes (similar a um Storybook)
 */
@Component({
  selector: 'app-shared-examples',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    ProjectCardComponent
  ],
  template: `
    <div class="container mx-auto p-8 space-y-12">
      
      <!-- Seção: Buttons -->
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-gray-900">Button Component</h2>
        
        <div class="flex flex-wrap gap-4">
          <app-button buttonStyle="primary" (clicked)="handleClick('Primary')">
            Primary Button
          </app-button>
          
          <app-button buttonStyle="secondary" (clicked)="handleClick('Secondary')">
            Secondary Button
          </app-button>
          
          <app-button buttonStyle="outline" (clicked)="handleClick('Outline')">
            Outline Button
          </app-button>
          
          <app-button buttonStyle="danger" (clicked)="handleClick('Danger')">
            Danger Button
          </app-button>
        </div>

        <div class="flex flex-wrap gap-4">
          <app-button size="sm">Small</app-button>
          <app-button size="md">Medium</app-button>
          <app-button size="lg">Large</app-button>
        </div>

        <div class="flex flex-wrap gap-4">
          <app-button [loading]="true">Loading...</app-button>
          <app-button [disabled]="true">Disabled</app-button>
        </div>

        <div class="max-w-md">
          <app-button [fullWidth]="true">Full Width Button</app-button>
        </div>
      </section>

      <!-- Seção: Project Cards -->
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-gray-900">Project Card Component</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <app-project-card 
            *ngFor="let project of exampleProjects"
            [project]="project"
          />
        </div>
      </section>

      <!-- Seção: Inputs -->
      <section class="space-y-4">
        <h2 class="text-3xl font-bold text-gray-900">Input Component</h2>
        
        <form [formGroup]="exampleForm" class="max-w-2xl space-y-4">
          <app-input
            label="Nome Completo"
            placeholder="Digite seu nome"
            type="text"
            [control]="getControl('nome')"
            [required]="true"
            hint="Mínimo de 3 caracteres"
          />

          <app-input
            label="E-mail"
            placeholder="seu@email.com"
            type="email"
            [control]="getControl('email')"
            [required]="true"
          />

          <app-input
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            [control]="getControl('senha')"
            [required]="true"
            hint="Mínimo de 6 caracteres"
          />

          <app-input
            label="Valor da Meta"
            placeholder="0.00"
            type="number"
            [control]="getControl('valor')"
            [required]="true"
            hint="Valor mínimo: R$ 10,00"
          />

          <app-input
            label="Data Limite"
            type="date"
            [control]="getControl('dataLimite')"
            [required]="true"
          />

          <app-input
            label="Descrição do Projeto"
            placeholder="Descreva seu projeto..."
            type="textarea"
            [control]="getControl('descricao')"
            [rows]="6"
            [required]="true"
          />

          <div class="flex gap-4">
            <app-button 
              type="submit" 
              [disabled]="!exampleForm.valid"
              (clicked)="handleSubmit()"
            >
              Enviar Formulário
            </app-button>

            <app-button 
              buttonStyle="outline" 
              type="button"
              (clicked)="resetForm()"
            >
              Limpar
            </app-button>
          </div>
        </form>

        <div *ngIf="formSubmitted" class="max-w-2xl p-4 bg-green-100 border border-green-400 rounded-lg">
          <h3 class="font-bold text-green-800">Formulário Enviado!</h3>
          <pre class="mt-2 text-sm text-green-700">{{ exampleForm.value | json }}</pre>
        </div>
      </section>

    </div>
  `,
  styles: []
})
export class SharedExamplesComponent {
  exampleForm: FormGroup;
  formSubmitted = false;

  exampleProjects: Project[] = [
    {
      id: 1,
      titulo: 'Projeto de Tecnologia Inovadora',
      descricaoCurta: 'Desenvolvimento de uma plataforma revolucionária para conectar desenvolvedores',
      imagemUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      criadorId: 1,
      criadorNome: 'João Silva',
      criadorFoto: 'https://i.pravatar.cc/150?img=1',
      metaValor: 50000,
      valorArrecadado: 42000,
      dataLimite: new Date('2025-12-31'),
      dataCriacao: new Date('2025-01-15'),
      categoria: 'Tecnologia',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 156
    },
    {
      id: 2,
      titulo: 'Projeto de Arte Comunitária',
      descricaoCurta: 'Criação de um mural colaborativo na comunidade local com artistas locais',
      imagemUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
      criadorId: 2,
      criadorNome: 'Maria Santos',
      metaValor: 15000,
      valorArrecadado: 8500,
      dataLimite: new Date('2025-06-30'),
      dataCriacao: new Date('2025-02-01'),
      categoria: 'Arte',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 67
    },
    {
      id: 3,
      titulo: 'Startup de Energia Sustentável',
      descricaoCurta: 'Desenvolver soluções de energia solar acessíveis para comunidades rurais',
      imagemUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
      criadorId: 3,
      criadorNome: 'Pedro Oliveira',
      criadorFoto: 'https://i.pravatar.cc/150?img=3',
      metaValor: 100000,
      valorArrecadado: 25000,
      dataLimite: new Date('2025-11-15'),
      dataCriacao: new Date('2025-01-10'),
      categoria: 'Sustentabilidade',
      status: ProjectStatus.ATIVO,
      numeroApoiadores: 89
    }
  ];

  constructor(private fb: FormBuilder) {
    this.exampleForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      valor: [0, [Validators.required, Validators.min(10)]],
      dataLimite: ['', Validators.required],
      descricao: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  getControl(name: string) {
    return this.exampleForm.get(name) as any;
  }

  handleClick(buttonType: string): void {
    console.log(`${buttonType} button clicked!`);
    alert(`Você clicou no botão: ${buttonType}`);
  }

  handleSubmit(): void {
    if (this.exampleForm.valid) {
      console.log('Form Data:', this.exampleForm.value);
      this.formSubmitted = true;
      
      setTimeout(() => {
        this.formSubmitted = false;
      }, 5000);
    }
  }

  resetForm(): void {
    this.exampleForm.reset();
    this.formSubmitted = false;
  }
}
