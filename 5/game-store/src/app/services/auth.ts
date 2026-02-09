import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  currentUser = signal<any>(null);

  constructor() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  isAuthenticated(): boolean {
    // Returns true if currentUser signal is not null/undefined
    return !!this.currentUser();
  }

  login(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    this.currentUser.set(userData);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    this.currentUser.set(null);
    this.router.navigate(['/login']); // Redirect to login
  }
  updateUser(updatedUser: any) {
  this.currentUser.set(updatedUser);
  const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
  const index = allUsers.findIndex((u: any) => u.username === updatedUser.username);
  if (index !== -1) {
    allUsers[index] = updatedUser;
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
  }
}
}