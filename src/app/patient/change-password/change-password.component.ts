import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { PatientService } from '@services-api/patient.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  currentUser: any;
  confirmPassword: string;
  submitTouched: boolean;
  oldPassword: string;

  constructor(
    private _auth: AuthenticationService,
    private _patientService: PatientService,
    private _toastService: ToastService) { }

  ngOnInit(): void {
    this.currentUser = this._auth.currentUser;
  }

  submit() {
    this.submitTouched = true;
    if (this.currentUser.plainPassword == this.confirmPassword) {
      this._patientService
        .updatePatient(this.currentUser, this.currentUser.id)
        .subscribe((user) => {
          this._toastService.showSuccess(
            'Success',
            'your password changed successfully.'
          );
        });
    }
  }

}
