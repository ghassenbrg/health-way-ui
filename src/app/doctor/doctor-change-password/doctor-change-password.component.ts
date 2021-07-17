import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@services-api/doctor.service';
import { ToastService } from '@services/toast.service';
import { DoctorDashboardContainerComponent } from '../doctor-dashboard-container/doctor-dashboard-container.component';

@Component({
  selector: 'app-doctor-change-password',
  templateUrl: './doctor-change-password.component.html',
  styleUrls: ['./doctor-change-password.component.scss'],
})
export class DoctorChangePasswordComponent implements OnInit {
  currentUser: any;
  confirmPassword: string;
  submitTouched: boolean;
  oldPassword: string;
  constructor(
    private _doctorDashboard: DoctorDashboardContainerComponent,
    private _doctorService: DoctorService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.currentUser = this._doctorDashboard.currentUser;
  }

  submit() {
    this.submitTouched = true;
    if (this.currentUser.plainPassword == this.confirmPassword) {
      this._doctorService
        .updateDoctor(this.currentUser, this.currentUser.id)
        .subscribe((user) => {
          this._toastService.showSuccess(
            'Success',
            'your password changed successfully.'
          );
        });
    }
  }
}
