import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { ToastService } from './../../core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  credentials: {username: any, password: any} = {username: '', password: ''};
  showLoader: boolean;

  constructor(
    private _auth: AuthenticationService,
    private _toastService: ToastService,
    private router: Router, 
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    if (this._auth.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  authentificate() {
    this.showLoader = true;
    this._auth.login(this.credentials.username, this.credentials.password).subscribe(res => {
      this.showLoader = false;
      let redirectTo: string = this.route.snapshot.queryParams.returnUrl;
      this._toastService.showSuccess('Success', 'Login successfully with user: ' + this.credentials.username);
      this.router.navigate([redirectTo ? redirectTo :'/']);
    },
    err =>  {
      this.showLoader = false;
      this._toastService.showError('Error', 'You have entered an invalid username or password.');
    });
  }
}
