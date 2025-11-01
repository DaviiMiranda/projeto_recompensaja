import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'currentUser';
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasStoredUser());
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  login(email: string, password: string): Observable<User> {
    if (!email || !password) {
      return throwError(() => new Error('Email e senha são obrigatórios'));
    }

    const mockUser: User = {
      id: '1',
      nome: 'Usuário Demo',
      email: email,
      roles: ['CREATOR', 'BACKER'],
      avatar: 'https://ui-avatars.com/api/?name=Usuario+Demo&background=4f46e5&color=fff'
    };

    return of(mockUser).pipe(
      delay(1000),
      tap(user => {
        this.setUser(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(user);
  }

  private getStoredUser(): User | null {
    const userJson = localStorage.getItem(this.STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  private hasStoredUser(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }
}
