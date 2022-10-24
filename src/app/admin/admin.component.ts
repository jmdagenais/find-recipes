import {Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

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
      .subscribe((value) => {
        this.router.navigate(['/']);
      }, (err) => {
        // TODO: display an error msg
      });
  }

}
