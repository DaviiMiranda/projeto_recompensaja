import { Component, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnDestroy {
  editingSection = signal<string | null>(null);
  
  formData = signal({
    nome: '',
    email: '',
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  currentUser$!: Observable<any>; // ou use um tipo User | null

  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService) {
    // atribuir depois que o serviço foi injetado
    this.currentUser$ = this.authService.currentUser$;

    // se quiser sincronizar o form com o usuário atual via subscription:
    this.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.formData.set({
            ...this.formData(),
            nome: user.nome,
            email: user.email
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startEditing(section: string): void {
    this.editingSection.set(section);
  }

  cancelEditing(): void {
    this.editingSection.set(null);
    this.resetForm();
  }

  saveNome(): void {
    const user = this.authService.getCurrentUser();
    if (user && this.formData().nome.trim()) {
      user.nome = this.formData().nome;
      this.updateUser(user);
      this.editingSection.set(null);
    }
  }

  saveEmail(): void {
    const user = this.authService.getCurrentUser();
    if (user && this.formData().email.trim()) {
      user.email = this.formData().email;
      this.updateUser(user);
      this.editingSection.set(null);
    }
  }

  saveSenha(): void {
    if (this.formData().novaSenha === this.formData().confirmarSenha && this.formData().novaSenha.trim()) {
      // Aqui conectar com a API real
      console.log('Senha alterada para:', this.formData().novaSenha);
      this.editingSection.set(null);
      this.resetForm();
    }
  }

  private updateUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    // ideal: notificar o AuthService para propagar a mudança (ex: authService.setCurrentUser(user))
  }

  private resetForm(): void {
    const user = this.authService.getCurrentUser();
    this.formData.set({
      nome: user?.nome || '',
      email: user?.email || '',
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: ''
    });
  }
}