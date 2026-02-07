import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  // Error message for registration logic errors (like duplicate emails)
  regError: string = '';

  // Password Regex: 8+ chars, 1 Upper, 1 Lower, 1 Number, 1 Special
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  regForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    addresses: this.fb.array([])
  });

  // --- GETTERS (Crucial for fixing template errors) ---

  /** Shortcut for the password control to avoid 'undefined' errors in template */
  get passwordControl(): AbstractControl | null {
    return this.regForm.get('password');
  }

  /** Shortcut for the addresses FormArray */
  get addresses(): FormArray {
    return this.regForm.get('addresses') as FormArray;
  }

  // --- METHODS ---

  /** Adds a new address group to the array */
  addAddress() {
    this.addresses.push(this.fb.group({
      address: ['', Validators.required],
      street: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required]
    }));
  }

  /** Removes an address by its index */
  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  /** Utility to check if a control is invalid for UI styling */
  isInvalid(controlName: string): boolean {
    const control = this.regForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onRegister() {
    this.regError = ''; // Clear previous errors

    if (this.regForm.valid) {
      const newUser = this.regForm.value;
      
      // Get the local storage "database"
      const existingUsersRaw = localStorage.getItem('allUsers');
      const users = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

      // 1. Check for Duplicate Email
      if (users.find((u: any) => u.email === newUser.email)) {
        this.regError = 'This email is already registered.';
        return;
      }

      // 2. Check for Duplicate Username
      if (users.find((u: any) => u.username === newUser.username)) {
        this.regError = 'Username is already taken. Try another.';
        return;
      }

      // 3. Success: Save and Login
      users.push(newUser);
      localStorage.setItem('allUsers', JSON.stringify(users));
      
      this.auth.login(newUser);
      this.router.navigate(['/products']);

    } else {
      // Show all errors if the user clicks enter on an empty form
      this.regForm.markAllAsTouched();
    }
  }
}