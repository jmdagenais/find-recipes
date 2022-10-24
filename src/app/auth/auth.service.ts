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

  constructor(private api: Api) { }

  authenticate(password: string) {
    return this.api.post('/login', { password })
      .pipe(tap((response: { token: string }) => {
        this.api.token = response.token;
        this._isAuthenticated = true;
      }));
  }
}
