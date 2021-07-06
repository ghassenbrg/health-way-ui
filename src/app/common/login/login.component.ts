import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  credentials: {username: any, password: any} = {username: 'admin@admin.com', password: 'password'};
  
  constructor(private _auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  authentificate() {
    this._auth.login(this.credentials.username, this.credentials.password).subscribe(res => console.log(res));
  }
}
