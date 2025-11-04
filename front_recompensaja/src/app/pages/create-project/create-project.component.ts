import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserProjectService } from '../../core/services/user-project.service';
import { StepperComponent, Step } from '../../shared/components/stepper/stepper.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, StepperComponent, ButtonComponent],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit {
  currentStep = 0;
  isSubmitting = false;
  showSuccessModal = false;

  steps: Step[] = [
    { label: 'Informações Básicas', completed: false },
    { label: 'Detalhes', completed: false },
    { label: 'Recompensas', completed: false }
  ];

  basicInfoForm!: FormGroup;
  detailsForm!: FormGroup;
  rewardsForm!: FormGroup;

  categories: string[] = [
    'Tecnologia',
    'Gastronomia',
    'Jogos',
    'Literatura',
    'Cinema',
    'Arte',
    'Música',
    'Educação'
  ];

  constructor(
    private fb: FormBuilder,
    private userProjectService: UserProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 30);

    this.basicInfoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      goalAmount: [null, [Validators.required, Validators.min(1000)]],
      deadline: ['', Validators.required]
    });

    this.detailsForm = this.fb.group({
      shortDescription: ['', [Validators.required, Validators.maxLength(200)]],
      longDescription: ['', [Validators.required, Validators.minLength(50)]],
      video: [''],
      image: ['https://images.unsplash.com/photo-1557821552-17105176677c?w=800']
    });

    this.rewardsForm = this.fb.group({
      rewards: this.fb.array([])
    });

    this.addReward();
  }

  get rewards(): FormArray {
    return this.rewardsForm.get('rewards') as FormArray;
  }

  createRewardFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(10)]],
      estimatedDelivery: ['', Validators.required],
      isLimited: [false],
      limitQuantity: [null]
    });
  }

  addReward(): void {
    this.rewards.push(this.createRewardFormGroup());
  }

  removeReward(index: number): void {
    if (this.rewards.length > 1) {
      this.rewards.removeAt(index);
    }
  }

  nextStep(): void {
    if (this.validateCurrentStep()) {
      this.steps[this.currentStep].completed = true;
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 0:
        if (this.basicInfoForm.invalid) {
          this.basicInfoForm.markAllAsTouched();
          return false;
        }
        return true;
      case 1:
        if (this.detailsForm.invalid) {
          this.detailsForm.markAllAsTouched();
          return false;
        }
        return true;
      case 2:
        if (this.rewardsForm.invalid || this.rewards.length === 0) {
          this.rewardsForm.markAllAsTouched();
          return false;
        }
        return true;
      default:
        return false;
    }
  }

  async submitProject(): Promise<void> {
    if (!this.validateCurrentStep()) {
      return;
    }

    if (confirm('Tem certeza que deseja publicar este projeto?')) {
      this.isSubmitting = true;

      const projectData = {
        ...this.basicInfoForm.value,
        ...this.detailsForm.value,
        rewards: this.rewards.value
      };

      this.userProjectService.createProject(projectData).subscribe({
        next: (project) => {
          this.showSuccessModal = true;
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        error: (error) => {
          alert('Erro ao criar projeto. Tente novamente.');
          this.isSubmitting = false;
        }
      });
    }
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) return 'Campo obrigatório';
      if (field.errors['minlength']) return `Mínimo de ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['maxlength']) return `Máximo de ${field.errors['maxlength'].requiredLength} caracteres`;
      if (field.errors['min']) return `Valor mínimo: ${field.errors['min'].min}`;
    }
    return '';
  }
}
