import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonStyle = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() buttonStyle: ButtonStyle = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: ButtonType = 'button';
  @Input() fullWidth: boolean = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const classes = ['btn'];
    
    classes.push(`btn-${this.buttonStyle}`);
    classes.push(`btn-${this.size}`);
    
    if (this.fullWidth) {
      classes.push('btn-full');
    }
    
    if (this.loading) {
      classes.push('btn-loading');
    }

    return classes.join(' ');
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
