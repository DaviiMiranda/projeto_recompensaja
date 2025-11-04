import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay } from 'rxjs';
import { User } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<User> {
    // Credenciais de teste
    if (email === 'teste@recompensaja.com' && password === '123456') {
      const mockUser: User = {
        id: '1',
        name: 'João Silva',
        email: email,
        avatar: `https://ui-avatars.com/api/?name=João+Silva&background=0ea5e9&color=fff`
      };
      return of(mockUser).pipe(delay(1000));
    }

    // Login inválido
    return new Observable(observer => {
      setTimeout(() => {
        observer.error({ message: 'Credenciais inválidas' });
      }, 1000);
    });
  }

  register(name: string, email: string, password: string): Observable<User> {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0ea5e9&color=fff`
    };

    return of(newUser).pipe(delay(1000));
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
