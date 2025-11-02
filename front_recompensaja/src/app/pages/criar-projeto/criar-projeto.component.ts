import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-projeto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './criar-projeto.component.html',
})
export class CriarProjetoComponent {
  projectForm: FormGroup;
  categorias = [
    'Tecnologia',
    'Arte',
    'Sustentabilidade',
    'Comunidade',
    'Saúde',
    'Música',
    'Literatura',
    'Educação',
    'Esportes'
  ];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      titulo: ['', Validators.required],
      descricaoCurta: ['', Validators.required],
      descricaoCompleta: ['', Validators.required],
      imagemUrl: ['', Validators.required],
      metaValor: ['', [Validators.required, Validators.min(1)]],
      dataLimite: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe({
        next: (newProject) => {
          this.router.navigate(['/projects', newProject.id]);
        },
        error: (err) => {
          console.error('Erro ao criar projeto', err);
          // Tratar erro - exibir mensagem para o usuário
        }
      });
    }
  }
}