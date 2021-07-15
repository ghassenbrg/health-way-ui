import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { LoaderService } from '@services/loader.service';
import { ToastService } from './../../core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials: { username: any; password: any } = {
    username: '',
    password: '',
  };

  constructor(
    private _loader: LoaderService,
    private _auth: AuthenticationService,
    private _toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this._auth.currentUser) {
      this.router.navigate(['/']);
    }
  }

  authentificate(authType?: string) {
    switch (authType) {
      case 'facebook':
      case 'google':
        this._toastService.showInfo(
          'Info',
          'Sorry, the authentication via social networks is not yet available.'
        );
        break;
      default:
        this._auth
          .login(this.credentials.username, this.credentials.password)
          .subscribe(
            (res) => {
              let redirectTo: string =
                this.route.snapshot.queryParams.returnUrl;
              this._toastService.showSuccess(
                'Success',
                'Login successfully with user: ' + this.credentials.username
              );
              this.router.navigate([redirectTo ? redirectTo : '/']);
            },
            (err) => {}
          );
        break;
    }
  }
}
