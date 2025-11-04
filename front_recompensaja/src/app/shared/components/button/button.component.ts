import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() style: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() loading = false;

  get buttonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const styleClasses = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 disabled:bg-gray-400',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 disabled:bg-gray-400',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 disabled:border-gray-400 disabled:text-gray-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-400'
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const widthClass = this.fullWidth ? 'w-full' : '';
    const disabledClass = this.disabled || this.loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer';

    return `${baseClasses} ${styleClasses[this.style]} ${sizeClasses[this.size]} ${widthClass} ${disabledClass}`;
  }
}
