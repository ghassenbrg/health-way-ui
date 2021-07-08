import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { ToastService } from '@services/toast.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RequestInterceptorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private _toastService: ToastService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let token = this.authenticationService.currentUserValue;

    let headers = request.headers.append('Accept: "*/*"', 'no-cache');
    headers = request.headers.append('Cache-control', 'no-store');
    headers = request.headers.append('Expires', '0');
    headers = request.headers.append('Pragma', 'no-cache');
    if (token) {
      headers = request.headers.append('Authorization', `Bearer ${token}`);
    }
    const clonedReq = request.clone({ headers: headers });

    return next.handle(clonedReq).pipe(catchError(err => {
      console.log('err')
      console.log(err)
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        //location.reload(true);
      }
      const error = err.error.message || err.statusText;
      this._toastService.showError('Error', error);
      return throwError(err);
    }));
  }
}
