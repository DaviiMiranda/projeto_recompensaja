import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = signal(false);
  isDropdownOpen = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get isAuthenticated$() {
    return this.authService.isAuthenticated$;
  }

  get currentUser$() {
    return this.authService.currentUser$;
  }

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update(value => !value);
  }

  closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.closeDropdown();
    this.router.navigate(['/']);
  }
}
