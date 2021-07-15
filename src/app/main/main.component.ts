import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { Doctor } from '@core/models/doctor.model';
import { Patient } from '@core/models/patient.model';
import { User } from '@models/user.model';
import { LoaderService } from '@services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild(NavbarComponent) navbarComponent!: NavbarComponent;

  $showLoader: Observable<boolean>;
  currentUserLoader: boolean;
  currentUser: User | Doctor | Patient;
  footerCustomStyle: string = '';
  navbarCustomStyle: string = '';

  componentsWithoutFooter: string[] = ['MapSearcherComponent'];
  componentsWithStickyNavbar: string[] = ['MapSearcherComponent'];

  constructor(
    private _loader: LoaderService,
    private _auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.$showLoader = this._loader.loaderState;
    this._auth.currentUserSubject
      .asObservable()
      .subscribe((user) => (this.currentUser = user));
  }

  componentAdded(event) {
    if (this.navbarComponent) {
      this.navbarComponent.checkActiveRoute();
    }
    this.footerCustomStyle = this.componentsWithoutFooter.includes(
      event.constructor.name
    )
      ? 'hide-footer'
      : '';
    this.navbarCustomStyle = this.componentsWithStickyNavbar.includes(
      event.constructor.name
    )
      ? 'sticky-navbar'
      : '';
  }

  refreshCurrentUser() {
    this.currentUser = this._auth.currentUser;
  }
}
