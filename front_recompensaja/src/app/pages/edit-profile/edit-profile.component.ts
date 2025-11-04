import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/interfaces';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  currentUser: User | null = null;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  emailForm!: FormGroup;

  activeTab: 'profile' | 'email' | 'password' = 'profile';
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  showPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.initializeForms();
  }

  initializeForms(): void {
    this.profileForm = this.fb.group({
      name: [this.currentUser?.name || '', [Validators.required, Validators.minLength(3)]]
    });

    this.emailForm = this.fb.group({
      email: [this.currentUser?.email || '', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  switchTab(tab: 'profile' | 'email' | 'password'): void {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const updatedName = this.profileForm.get('name')?.value;

    setTimeout(() => {
      this.currentUser = {
        ...this.currentUser!,
        name: updatedName
      };

      this.authService.updateUser(this.currentUser);
      this.successMessage = '✓ Nome atualizado com sucesso!';
      this.isLoading = false;
    }, 1000);
  }

  updateEmail(): void {
    if (this.emailForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    const email = this.emailForm.get('email')?.value;
    const confirmEmail = this.emailForm.get('confirmEmail')?.value;

    if (email !== confirmEmail) {
      this.errorMessage = 'Os emails não coincidem.';
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    setTimeout(() => {
      this.currentUser = {
        ...this.currentUser!,
        email: email
      };

      this.authService.updateUser(this.currentUser);
      this.successMessage = '✓ Email atualizado com sucesso!';
      this.emailForm.reset({ email: email });
      this.isLoading = false;
    }, 1000);
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    if (this.passwordForm.errors?.['passwordMismatch']) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    setTimeout(() => {
      this.successMessage = '✓ Senha atualizada com sucesso!';
      this.passwordForm.reset();
      this.isLoading = false;
    }, 1000);
  }

  togglePasswordVisibility(field: 'current' | 'new' | 'confirm'): void {
    if (field === 'current') {
      this.showPassword = !this.showPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  getPasswordStrength(): { strength: string; color: string; width: number } {
    const password = this.passwordForm.get('newPassword')?.value || '';
    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    const strengths = [
      { label: '', color: 'bg-gray-200', width: 0 },
      { label: 'Fraca', color: 'bg-red-500', width: 20 },
      { label: 'Média', color: 'bg-yellow-500', width: 50 },
      { label: 'Boa', color: 'bg-blue-500', width: 75 },
      { label: 'Forte', color: 'bg-green-500', width: 100 }
    ];

    const result = strengths[strength] || strengths[0];
    return {
      strength: result.label,
      color: result.color,
      width: result.width
    };
  }
}
