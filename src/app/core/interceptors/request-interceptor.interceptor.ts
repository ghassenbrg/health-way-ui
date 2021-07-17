import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { PATTERN_ISO8601 } from '@core/utils/date.util';
import { LoaderService } from '@services/loader.service';
import { ToastService } from '@services/toast.service';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const PATTERN_NUMBER = /^-?[0-9,.]*$/;
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
          /* const body = httpEvent.body;
          this.convertToDate(body); */
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

  /**
   * Converts to date
   * @param body
   */
  private convertToDate(body) {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (this.isIso8601(value)) {
        body[key] = new Date(value);
      } else if (typeof value === 'object') {
        this.convertToDate(value);
      }
    }
  }

  /**
   * Verifies whether the value respects the iso 8601 or not
   * @param value
   */
  private isIso8601(value) {
    if (value === null || value === undefined || PATTERN_NUMBER.test(value)) {
      return false;
    }
    return PATTERN_ISO8601.test(value);
  }
}
