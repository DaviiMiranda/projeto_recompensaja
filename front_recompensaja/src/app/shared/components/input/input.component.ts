import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR, 
  ReactiveFormsModule, 
  FormControl,
  ValidationErrors 
} from '@angular/forms';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea' | 'tel' | 'url';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: InputType = 'text';
  @Input() control!: FormControl;
  @Input() errorMessages: Record<string, string> = {};
  @Input() required: boolean = false;
  @Input() rows: number = 4;
  @Input() hint: string = '';

  value: any = '';
  disabled: boolean = false;
  showPassword: boolean = false;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  private defaultErrorMessages: Record<string, string> = {
    required: 'Este campo é obrigatório',
    email: 'Digite um e-mail válido',
    minlength: 'O campo deve ter no mínimo {requiredLength} caracteres',
    maxlength: 'O campo deve ter no máximo {requiredLength} caracteres',
    min: 'O valor mínimo é {min}',
    max: 'O valor máximo é {max}',
    pattern: 'Formato inválido'
  };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const value = this.type === 'number' ? parseFloat(target.value) : target.value;
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get hasError(): boolean {
    return !!(this.control && this.control.invalid && this.control.touched);
  }

  get errorMessage(): string {
    if (!this.hasError || !this.control.errors) return '';

    const errors: ValidationErrors = this.control.errors;
    const errorKey = Object.keys(errors)[0];
    
    // Verifica se há mensagem customizada
    if (this.errorMessages[errorKey]) {
      return this.errorMessages[errorKey];
    }

    // Usa mensagem padrão
    let message = this.defaultErrorMessages[errorKey] || 'Campo inválido';

    // Substitui placeholders
    if (errors[errorKey] && typeof errors[errorKey] === 'object') {
      Object.keys(errors[errorKey]).forEach(key => {
        message = message.replace(`{${key}}`, errors[errorKey][key]);
      });
    }

    return message;
  }

  get inputId(): string {
    return `input-${Math.random().toString(36).substr(2, 9)}`;
  }
}
