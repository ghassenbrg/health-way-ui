import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {

  patientSummaryDisplayed: boolean = true;
  favouritesDisplayed: boolean;
  profileSettingsDisplayed: boolean;
  changePasswordDisplayed: boolean;

  constructor() { }

  ngOnInit(): void {
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
