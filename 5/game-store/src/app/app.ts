import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../app/components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-navbar />

      <main class="flex-grow">
        <router-outlet />
      </main>

      <footer class="bg-brand-dark text-gray-400 py-8 border-t border-gray-700">
        <div class="container mx-auto px-10 text-center">
          <p class="font-bold text-brand-orange mb-2 italic">G-STORE 2026</p>
          <p class="text-sm">Built with Angular & Tailwind</p>
        </div>
      </footer>
    </div>
  `
})
export class App {}