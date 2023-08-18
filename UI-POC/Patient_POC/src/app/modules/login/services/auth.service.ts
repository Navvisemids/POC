import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated(): boolean {
    const loginCreds = JSON.parse(localStorage.getItem('UserCreds')!);
    if (loginCreds?.userName == 'xyz' && loginCreds?.password == 'abc123@') {
      return true;
    }
    throw new Error('Invalid Credentials');
  }
}
