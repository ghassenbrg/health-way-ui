import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@app/doctor/doctor.service';
import { ToastService } from '@services/toast.service';
import { Router } from '@angular/router';
import { MainComponent } from '@app/main/main.component';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { User } from '@models/user.model';
import * as moment from 'moment';
import { PatientService } from '@app/patient/patient.service';
import { roles } from '@core/config/roles';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  doctorRegisterScreen: boolean;
  userInput: User = new User();
  showLoader: boolean;
  genders: any = [ "Male", "Female"];
  birthDate: Date;
  selectedGender: string;
  
  constructor(
    private _toastService: ToastService,
    private _doctorService: DoctorService,
    private _patientService: PatientService,
    private router: Router,
    private mainComponent: MainComponent,
    private _auth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  register(registerType?: string) {
    this.prepareUserInput();
    switch (registerType) {
      case 'facebook':
      case 'google':
        this._toastService.showInfo('Info', 'Sorry, signUp via social networks is not yet available.');
        break;
      default:
        this.showLoader = true;
        if (this.doctorRegisterScreen) {
          this._doctorService.createDoctor(this.userInput).subscribe(res => {
            this.showLoader = false;
            this._toastService.showSuccess('Success', 'Doctor successfully registred with user: ' + res.username);
            this.login(res.username,this.userInput.password);
          },
            err => {
              this.showLoader = false;
            });
        }
        else {
          this._patientService.createPatient(this.userInput).subscribe(res => {
            this.showLoader = false;
            this._toastService.showSuccess('Success', 'Patient successfully registred with user: ' + res.username);
            this.login(res.username,this.userInput.password);
          },
            err => {
              this.showLoader = false;
            });
        }
        break;
    }
  }

  changeUserRole(role: string) {
    this.userInput = new User();
    this.birthDate = undefined;
    if (role == 'doctor') {
      this.doctorRegisterScreen = true;
      this.userInput.roles = [roles.ROLE_DOCTOR];
    }
    else {
      this.doctorRegisterScreen = false;
    }
  }

  prepareUserInput() {
    this.userInput.isActive = true;
    if (this.selectedGender) {
      this.userInput.gender = this.selectedGender.toLowerCase();
    }
    if (this.birthDate) {
      this.userInput.birthDate = moment(this.birthDate).format("YYYY-MM-DD");
    }
  }

  login(username: string, password: string) {
    this._auth.login(username, password).subscribe(res => {
      this.showLoader = false;
      this.mainComponent.refreshCurrentUser();
      this.router.navigate(['/']);
    },
      err => {
        this.showLoader = false;
      });
  }

}
