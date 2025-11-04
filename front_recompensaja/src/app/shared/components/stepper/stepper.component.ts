import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Step {
  label: string;
  completed: boolean;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {
  @Input() steps: Step[] = [];
  @Input() currentStep: number = 0;
}
