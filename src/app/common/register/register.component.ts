import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { roles } from '@core/config/roles';
import { User } from '@models/user.model';
import { DoctorService } from '@services-api/doctor.service';
import { PatientService } from '@services-api/patient.service';
import { ToastService } from '@services/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  doctorRegisterScreen: boolean;
  userInput: User = new User();
  genders: any = ['male', 'female'];
  birthDate: Date;
  selectedGender: string;
  yearRange: string;
  confirmPassword: string;
  submitTouched: boolean;

  constructor(
    private _toastService: ToastService,
    private _doctorService: DoctorService,
    private _patientService: PatientService,
    private router: Router,
    private _auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.yearRange = this.getYearRange();
  }

  register(registerType?: string) {
    if (this.validateForm()) {
      this.prepareUserInput();
      switch (registerType) {
        case 'facebook':
        case 'google':
          this._toastService.showInfo(
            'Info',
            'Sorry, signUp via social networks is not yet available.'
          );
          break;
        default:
          if (this.doctorRegisterScreen) {
            this._doctorService.createDoctor(this.userInput).subscribe(
              (res) => {
                this._toastService.showSuccess(
                  'Success',
                  'Doctor successfully registred with user: ' + res.username
                );
                this.login(res.username, this.userInput.plainPassword);
              },
              (err) => {}
            );
          } else {
            this._patientService.createPatient(this.userInput).subscribe(
              (res) => {
                this._toastService.showSuccess(
                  'Success',
                  'Patient successfully registred with user: ' + res.username
                );
                this.login(res.username, this.userInput.plainPassword);
              },
              (err) => {}
            );
          }
          break;
      }
    }
  }

  validateForm(): boolean {
    this.submitTouched = true;
    let specificCheck: boolean;
    if (this.doctorRegisterScreen) {
      specificCheck = this.userInput && !!this.userInput.jobTitle;
    } else {
      specificCheck = this.userInput && !!this.birthDate;
    }
    return (
      specificCheck &&
      !!this.userInput.plainPassword &&
      this.userInput.plainPassword == this.confirmPassword &&
      !!this.userInput.firstName &&
      !!this.userInput.lastName &&
      !!this.selectedGender &&
      !!this.userInput.email
    );
  }

  changeUserRole(role: string) {
    this.userInput = new User();
    this.birthDate = undefined;
    if (role == 'doctor') {
      this.doctorRegisterScreen = true;
      this.userInput.roles = [roles.ROLE_DOCTOR];
    } else {
      this.doctorRegisterScreen = false;
    }
  }

  prepareUserInput() {
    this.userInput.isActive = true;
    if (this.selectedGender) {
      this.userInput.gender = this.selectedGender.toLowerCase();
    }
    if (this.birthDate) {
      this.userInput.birthDate = moment(this.birthDate).format('YYYY-MM-DD');
    }
  }

  login(username: string, password: string) {
    this._auth.login(username, password).subscribe(
      (res) => {
        this.router.navigate(['/']);
      },
      (err) => {}
    );
  }

  getYearRange(): string {
    const start = moment().subtract(90, 'years').year();
    const end = moment().subtract(13, 'years').year();
    return `${start}:${end}`;
  }
}
