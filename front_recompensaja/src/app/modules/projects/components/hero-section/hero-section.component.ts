import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {}
