import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { LoaderService } from '@services/loader.service';
import { ToastService } from '@services/toast.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private _toastService: ToastService,
    private _loader: LoaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let token = this.authenticationService.currentToken;

    let headers = request.headers.append('Accept: "*/*"', 'no-cache');
    headers = request.headers.append('Cache-control', 'no-store');
    headers = request.headers.append('Expires', '0');
    headers = request.headers.append('Pragma', 'no-cache');
    if (token) {
      headers = request.headers.append('Authorization', `Bearer ${token}`);
    }
    const clonedReq = request.clone({ headers: headers });

    // start our loader here
    this._loader.show();
    return next.handle(clonedReq).pipe(
      tap((httpEvent: HttpEvent<any>) => {
        if (httpEvent instanceof HttpResponse) {
          // stop loader Service
          this._loader.hide();
        }
      }),
      catchError((err) => {
        // stop loader Service
        this._loader.hide();
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
        }
        const error = err.error.message || err.statusText;
        this._toastService.showError('Error', error);
        return throwError(err);
      })
    );
  }
}
