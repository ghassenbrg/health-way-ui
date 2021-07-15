import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { UserService } from '@auth/_services/user.service';
import { roles } from '@core/config/roles';
import { Doctor } from '@models/doctor.model';
import { User } from '@models/user.model';
import { DoctorService } from '@services-api/doctor.service';
import { PatientService } from '@services-api/patient.service';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {

  currentUser: Doctor = new Doctor();
  showLoader: boolean = true;

  constructor(
    private _loader: LoaderService,
    private _userService: UserService,
    private _doctorService: DoctorService,
    private _patientService: PatientService,
    private _auth: AuthenticationService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this._loader.show();
    let currentRoles = this._auth.getRoles();
    let isDoctor: boolean = currentRoles.indexOf(roles.ROLE_DOCTOR) > -1;
    let isPatient: boolean = currentRoles.indexOf(roles.ROLE_PATIENT) > -1;
    let mail: string = this._auth.getMail();
    if (mail) {
      if (isDoctor) {
        this._doctorService.getDoctorByMail(mail).subscribe(res => {
          this._loader.hide();
          this.currentUser = res[0]
        });
      } else if (isPatient) {
        this._patientService.getPatientByMail(mail).subscribe(res => {
          this._loader.hide();
          this.currentUser = res[0]
        });
      } else {
        this._userService.getUserByMail(mail).subscribe(res => {
          this._loader.hide();
          this.currentUser = res[0]
        });
      }
    } else {
      this._loader.hide();
    }
  }
}
