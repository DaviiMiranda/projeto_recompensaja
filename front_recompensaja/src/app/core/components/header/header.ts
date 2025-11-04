import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../models/interfaces';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  isAuthenticated = false;
  currentUser: User | null = null;
  showProfileMenu = false;
  searchTerm = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/explore'], { queryParams: { search: this.searchTerm } });
    }
  }

  logout(): void {
    this.authService.logout();
    this.showProfileMenu = false;
    this.router.navigate(['/']);
  }
}
