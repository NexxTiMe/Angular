import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthService} from "../../service/auth.service";

const materialModules = [
  RouterOutlet,
  FormsModule,
  CommonModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [materialModules],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class LoginComponent {
  user: string = '';
  password: string = '';
  loginValid: boolean = true;
  error: string = ''

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }

  login(): void {
    this.authService.login(this.user, this.password)
      .subscribe({
        next: () => {
          this.loginValid = true;
          this.router.navigateByUrl('/home');
        },
        error: (error) => {
          this.loginValid = false;
          console.error('Login fallito', error);
        },
        complete: () => {
        }
      });
  }
}
