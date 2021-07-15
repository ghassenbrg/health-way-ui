import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { UserService } from '@auth/_services/user.service';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { roles } from '@core/config/roles';
import { Doctor } from '@core/models/doctor.model';
import { Patient } from '@core/models/patient.model';
import { User } from '@models/user.model';
import { DoctorService } from '@services-api/doctor.service';
import { PatientService } from '@services-api/patient.service';
import { LoaderService } from '@services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild(NavbarComponent) navbarComponent!: NavbarComponent;

  showLoader: Observable<boolean>;

  currentUser: User | Doctor | Patient;
  footerCustomStyle: string = '';
  navbarCustomStyle: string = '';

  componentsWithoutFooter: string[] = ['MapSearcherComponent'];
  componentsWithStickyNavbar: string[] = ['MapSearcherComponent'];

  constructor(
    private _loader: LoaderService,
    private _userService: UserService,
    private _doctorService: DoctorService,
    private _patientService: PatientService,
    private _auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.showLoader = this._loader.loaderState;
    this.refreshCurrentUser();
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
    this._loader.show();
    this.currentUser = undefined;
    let currentRoles = this._auth.getRoles();
    let isDoctor: boolean = currentRoles.indexOf(roles.ROLE_DOCTOR) > -1;
    let isPatient: boolean = currentRoles.indexOf(roles.ROLE_PATIENT) > -1;
    let mail: string = this._auth.getMail();
    if (mail) {
      if (isDoctor) {
        this._doctorService.getDoctorByMail(mail).subscribe((res) => {
          this._loader.hide();
          this.currentUser = res[0];
        });
      } else if (isPatient) {
        this._patientService.getPatientByMail(mail).subscribe((res) => {
          this._loader.hide();
          this.currentUser = res[0];
        });
      } else {
        this._userService.getUserByMail(mail).subscribe((res) => {
          this._loader.hide();
          this.currentUser = res[0];
        });
      }
    } else {
      this._loader.hide();
    }
  }
}
