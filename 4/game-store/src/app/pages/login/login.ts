import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginError: string = '';

  onLogin(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
      const emailValue = email.trim();
      
      const existingUsersRaw = localStorage.getItem('allUsers');
      const users = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];

      const foundUser = users.find((u: any) =>
        u.email === emailValue && u.password === password
      );

      if (foundUser) {
        this.auth.login(foundUser);
        this.loginError = '';
        
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/products';
        this.router.navigateByUrl(returnUrl);
      } else {
        this.loginError = 'Invalid email or password.';
      }
    }
  }
}