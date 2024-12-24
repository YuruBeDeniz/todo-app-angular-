import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../app/models/user.model';
import { UserService } from './user.service';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/users';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User | null>(null);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isLoading$ = this.isLoadingSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.isLoggedInSubject.next(true);
  }

  verifyStoredToken(): Observable<boolean> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return of(false);
    }
    this.isLoadingSubject.next(true);
    return this.http.get<User>(`${this.apiUrl}/verify/`).pipe(
      tap(user => {
        this.userSubject.next(user);
        this.isLoggedInSubject.next(true);
      }),
      map(() => true), // Transform emitted value to boolean
      catchError(() => {
        this.logoutUser();
        return of(false);
      }),
      tap(() => this.isLoadingSubject.next(false))
    );
  }
  

  logoutUser(): void {
    this.userService.logout().subscribe({
      next: () => {
        // Notify the backend of logout success
        localStorage.removeItem('authToken');
        this.isLoggedInSubject.next(false);
        this.userSubject.next(null);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error during logout:', error);
        // Fallback to local logout in case of backend failure
        localStorage.removeItem('authToken');
        this.isLoggedInSubject.next(false);
        this.userSubject.next(null);
        this.router.navigate(['/login']);
      }
    });
  }

  redirectToLogin(): void {
    if (!this.hasToken()) {
      this.router.navigate(['/login']);
    }
  }
}
