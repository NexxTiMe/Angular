import {Component} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {ApplicationComponent} from "../application/application.component";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Application} from "../model/Application";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    ApplicationComponent,
    NgForOf,
    RouterLink,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  applications: Application[] = [
    {name: 'AMCHR', url: 'http://10.0.16.215:8080/areas/mainLogin.do'},
    {name: 'SIDI', url: 'http://10.0.16.215:8080/areas/mainLogin.do'},
    {name: 'PD', url: 'http://10.0.16.215:8080/areas/mainLogin.do'},
    {name: 'ATTI', url: 'http://10.0.16.215:8080/areas/mainLogin.do'}];

  logout(): void {
    this.authService.logoutAndRefresh();
  };

}
