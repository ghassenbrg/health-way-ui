import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { User } from '@models/user.model';
import { UserService } from './../core/auth/_services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild(NavbarComponent) navbarComponent!: NavbarComponent;

  showLoader: boolean;

  currentUser: User;
  footerCustomStyle: string = '';
  navbarCustomStyle: string = '';

  componentsWithoutFooter: string[] = ['MapSearcherComponent'];
  componentsWithStickyNavbar: string[] = ['MapSearcherComponent'];

  constructor(private _userService: UserService, private _auth: AuthenticationService) { }

  ngOnInit(): void {
    this.refreshCurrentUser();
  }

  componentAdded(event) {
    if (this.navbarComponent) {
      this.navbarComponent.checkActiveRoute();
    }
    this.footerCustomStyle = this.componentsWithoutFooter.includes(event.constructor.name) ? 'hide-footer' : '';
    this.navbarCustomStyle = this.componentsWithStickyNavbar.includes(event.constructor.name) ? 'sticky-navbar' : '';
  }

  refreshCurrentUser() {
    this.showLoader = true;
    this.currentUser = undefined;
    let mail: string = this._auth.getMail();
    if (mail) {
      this._userService.getUserByMail(mail).subscribe(res => {
        this.showLoader = false;
        this.currentUser = res[0]
      });
    } else {
      this.showLoader = false;
    }
  }
}
