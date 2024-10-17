import {Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import LoginComponent from "./authentication/login/login.component";
import {HomeComponent} from "./home/home.component";
import {authGuard} from "./http/auth.guard";

export const routes: Routes = [
  {
    path: '', canActivateChild: [authGuard], children: [
      {path: '', component: AppComponent, canActivate: [authGuard]},
      {path: 'home', component: HomeComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
];
