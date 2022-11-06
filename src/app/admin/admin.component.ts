import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  template: `
    <form class="d-flex" (submit)="submit()">
      <h5>Entrer le mot de passe pour avoir les droits d'administrateur: </h5>
      <input pInputText type="password" style="margin-left: 10px; margin-right: 10px" [(ngModel)]="password" name="password">
      <button type="submit" pButton label="Ok"></button>
    </form>
  `
})
export class AdminComponent {

  password = '';

  constructor(
    private authService: AuthService,
    private router: Router) {

  }

  submit() {
    this.authService.authenticate(this.password)
      .subscribe({
        next: (value) => {
          this.router.navigate(['/']);
        }, error: (err) => {
          // TODO: display an error msg
        }
      });
  }

}
