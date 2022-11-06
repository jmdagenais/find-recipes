import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { Api } from '../shared/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = false;

  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  constructor(private api: Api) {
    const savedToken: string = localStorage.getItem('token');
    if (savedToken) {
      this.api.token = savedToken;
      this._isAuthenticated = true;
    }

  }

  authenticate(password: string) {
    return this.api.post('/login', { password })
      .pipe(tap((response: { token: string }) => {
        this.api.token = response.token;
        this._isAuthenticated = true;
        localStorage.setItem('token', response.token);
      }));
  }

  logout() {
    this.api.token = null;
    this._isAuthenticated = false;
    localStorage.removeItem('token');
  }
}
