import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 routerLink="/" class="text-orange-500 text-2xl font-black italic cursor-pointer tracking-tighter">G-STORE</h1>
      
      <div class="flex items-center gap-6">
        <a routerLink="/products" routerLinkActive="text-orange-500" class="font-bold hover:text-orange-400 transition-colors">Store</a>
        
        @if (auth.currentUser()) {
          <div class="flex items-center gap-4 bg-slate-800 p-1 pl-4 rounded-full border border-slate-700">
            <span class="text-xs uppercase tracking-wider font-medium">
              Hi, <span class="text-orange-400 font-black">{{ auth.currentUser().username }}</span>
            </span>

            @if (!showConfirm()) {
              <button 
                (click)="confirmLogout()" 
                class="bg-slate-700 hover:bg-red-500/20 hover:text-red-400 px-4 py-2 rounded-full text-[10px] font-black transition-all uppercase">
                Logout
              </button>
            } @else {
              <div class="flex items-center animate-in fade-in zoom-in duration-200">
                <button 
                  (click)="onLogout()" 
                  class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-[10px] font-black transition-all uppercase shadow-lg shadow-red-900/40">
                  Confirm?
                </button>
                <button 
                  (click)="showConfirm.set(false)" 
                  class="ml-2 text-[10px] pr-2 font-bold text-slate-400 hover:text-white">
                  Cancel
                </button>
              </div>
            }
          </div>
        } @else {
          <div class="flex items-center gap-4">
            <a routerLink="/login" class="font-bold hover:text-orange-500 transition-colors text-sm">Login</a>
            <a routerLink="/register" class="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full font-black text-sm transition-all transform active:scale-95 shadow-lg shadow-orange-500/20">
              JOIN
            </a>
          </div>
        }
      </div>
    </nav>
  `
})
export class NavbarComponent {
  auth = inject(AuthService);
  
  // Using a Signal for the confirmation state
  showConfirm = signal(false);

  confirmLogout() {
    this.showConfirm.set(true);
    
    // Auto-reset if the user hesitates for too long (UX polish)
    setTimeout(() => {
      this.showConfirm.set(false);
    }, 4000);
  }

  onLogout() {
    this.auth.logout();
    this.showConfirm.set(false);
  }
}