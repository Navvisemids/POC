import { Component, OnInit } from '@angular/core';
import { LoginCredentials } from '../../models/login-credentials';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: '../../views/login.component.html',
  styleUrls: ['../../styles/login.component.less'],
})
export class LoginComponent {
  loginCreds!: LoginCredentials;
  loginData!: LoginCredentials;
  constructor(private authService: AuthService, private router: Router) {
    this.loginCreds = {
      userName: '',
      password: '',
    };
  }

  onLogin(): void {
    localStorage.setItem('UserCreds', JSON.stringify(this.loginCreds));
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/patient']);
    }
  }
}
