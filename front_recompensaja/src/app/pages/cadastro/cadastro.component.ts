import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../modules/auth/validators/password-match.validator';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, InputComponent, ButtonComponent],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  isLoading = false;
  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required]]
    }, {
      validators: passwordMatchValidator
    });
  }

  get nome(): FormControl {
    return this.registerForm.get('nome') as FormControl;
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get senha(): FormControl {
    return this.registerForm.get('senha') as FormControl;
  }

  get confirmarSenha(): FormControl {
    return this.registerForm.get('confirmarSenha') as FormControl;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;
    console.log('Formulário enviado:', this.registerForm.value);
    // Simula uma chamada de API
    setTimeout(() => {
      this.isLoading = false;
      // this.router.navigate(['/painel']); // Redirecionar após sucesso
    }, 2000);
  }
}
