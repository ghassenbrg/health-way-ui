import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainComponent } from '@app/main/main.component';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { ToastService } from './../../core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: { username: any, password: any } = { username: '', password: '' };
  showLoader: boolean;

  constructor(
    private _auth: AuthenticationService,
    private _toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private mainComponent: MainComponent
  ) { }

  ngOnInit(): void {
    if (this._auth.currentUserToken) {
      this.router.navigate(['/']);
    }
  }

  authentificate(authType?: string) {
    switch (authType) {
      case 'facebook':
        case 'google':
        this._toastService.showInfo('Info', 'Sorry, the authentication via social networks is not yet available.');
        break;
      default:
        this.showLoader = true;
        this._auth.login(this.credentials.username, this.credentials.password).subscribe(res => {
          this.showLoader = false;
          let redirectTo: string = this.route.snapshot.queryParams.returnUrl;
          this._toastService.showSuccess('Success', 'Login successfully with user: ' + this.credentials.username);
          this.mainComponent.refreshCurrentUser();
          this.router.navigate([redirectTo ? redirectTo : '/']);
        },
          err => {
            this.showLoader = false;
          });
        break;
    }
  }
}
