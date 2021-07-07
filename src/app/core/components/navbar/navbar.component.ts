import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this._auth.logout();
    this.router.navigate(['/login']);
  }

}
