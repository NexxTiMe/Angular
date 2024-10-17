import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.isLoggedIn();

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set("Authorization",
        "Bearer " + token)
    });
    return next(cloned).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse
        && [500, 401, 400].includes(error.status)
        && !!error.error
        && ['invalid_token', 'invalid_grant'].includes(error.error.error)) {
        authService.logoutAndRefresh();
        return throwError(() => error);
      }
      return throwError(() => error);
    }));
  } else {
    return next(req);
  }

};


