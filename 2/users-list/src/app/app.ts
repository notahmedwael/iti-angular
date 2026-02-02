import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import usersData from '../../public/users.json';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  role: 'admin' | 'user' | 'moderator';
  image: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.html',
})
export class App implements OnInit {
  searchQuery: string = '';
  
  // Cast the imported JSON to  User interface array
  users: User[] = usersData as User[];
  filteredUsers: User[] = [];

  ngOnInit() {
    // Initialize the display list with all users
    this.filteredUsers = [...this.users];
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user =>
      user.email.toLowerCase().includes(query)
    );
  }

  resetSearch() {
    this.searchQuery = '';
    this.filteredUsers = [...this.users];
  }

  getRoleClass(role: string): string {
    const base = 'font-bold uppercase !px-3';
    switch (role.toLowerCase()) {
      case 'admin': return `${base} !bg-red-500 !text-white`;
      case 'moderator': return `${base} !bg-yellow-400 !text-black`;
      case 'user': return `${base} !bg-green-500 !text-white`;
      default: return base;
    }
  }
}