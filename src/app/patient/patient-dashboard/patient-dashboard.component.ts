import { NavigationEnd, Router, Event } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Patient } from '@models/patient.model';
import { AuthenticationService } from '@auth/_services/authentication.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
})
export class PatientDashboardComponent implements OnInit {
  patientSummaryDisplayed: boolean;
  favouritesDisplayed: boolean;
  profileSettingsDisplayed: boolean;
  changePasswordDisplayed: boolean;
  section: any;
  currentUser: Patient;
  currentUserAge: number;

  constructor(
    private router: Router,
    private _auth: AuthenticationService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        switch (this.router.url) {
          case '/favourites':
            this.displayFavourites();
            break;
          case '/profile-settings':
            this.displayProfileSettings();
            break;
          case '/change-password':
            this.displayChangePassword();
            break;
          default:
            this.displayPatientSummary();
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.currentUser = this._auth.currentUser;
    console.log(this.currentUser)
    let timeDiff = Math.abs(Date.now() - new Date(this.currentUser.birthDate).getTime());
    this.currentUserAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
  }

  displayPatientSummary() {
    this.favouritesDisplayed = false;
    this.profileSettingsDisplayed = false;
    this.changePasswordDisplayed = false;
    this.patientSummaryDisplayed = true;
  }

  displayFavourites() {
    this.patientSummaryDisplayed = false;
    this.profileSettingsDisplayed = false;
    this.changePasswordDisplayed = false;
    this.favouritesDisplayed = true;
  }

  displayProfileSettings() {
    this.patientSummaryDisplayed = false;
    this.favouritesDisplayed = false;
    this.changePasswordDisplayed = false;
    this.profileSettingsDisplayed = true;
  }

  displayChangePassword() {
    this.patientSummaryDisplayed = false;
    this.favouritesDisplayed = false;
    this.profileSettingsDisplayed = false;
    this.changePasswordDisplayed = true;
  }
}
