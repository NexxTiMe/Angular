import {CanActivateChildFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const authGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  if (authService.isLoggedOut()) {
    authService.logoutAndRefresh();
    return false;
  }
  return true;
};
