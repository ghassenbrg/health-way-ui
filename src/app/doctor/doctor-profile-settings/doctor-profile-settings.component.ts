import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { City } from '@models/city.model';
import { Insurance } from '@models/insurance.model';
import { Speciality } from '@models/specialty.model';
import { DoctorService } from '@services-api/doctor.service';
import { CommonService } from '@services/common.service';
import { ToastService } from '@services/toast.service';
import * as moment from 'moment';
import { DoctorDashboardContainerComponent } from '../doctor-dashboard-container/doctor-dashboard-container.component';

@Component({
  selector: 'app-doctor-profile-settings',
  templateUrl: './doctor-profile-settings.component.html',
  styleUrls: ['./doctor-profile-settings.component.scss'],
})
export class DoctorProfileSettingsComponent implements OnInit {
  currentUser: any;
  genders: any = ['male', 'female'];
  yearRange: string;
  cities: City[] = [];
  specialities: Speciality[] = [];
  insurances: Insurance[] = [];
  constructor(
    private _doctorDashboard: DoctorDashboardContainerComponent,
    private _commonService: CommonService,
    private _doctorService: DoctorService,
    private _toastService: ToastService,
    private _auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this._doctorDashboard.currentUser;
    let cityPath: string = this.currentUser.city;
    if (cityPath) {
      let splittedPath: string[] = cityPath.split('/');
      this.currentUser.city = parseInt(
        splittedPath[splittedPath.length - 1],
        10
      );
    }
    if (this.currentUser.specialties) {
      for (
        let index = 0;
        index < this.currentUser.specialties.length;
        index++
      ) {
        let elementPath: string = this.currentUser.specialties[index];
        if (elementPath) {
          let splittedPath: string[] = elementPath.split('/');
          this.currentUser.specialties[index] = parseInt(
            splittedPath[splittedPath.length - 1],
            10
          );
        }
      }
    }
    if (this.currentUser.insurances) {
      for (let index = 0; index < this.currentUser.insurances.length; index++) {
        let elementPath: string = this.currentUser.insurances[index];
        if (elementPath) {
          let splittedPath: string[] = elementPath.split('/');
          this.currentUser.insurances[index] = parseInt(
            splittedPath[splittedPath.length - 1],
            10
          );
        }
      }
    }
    console.log(this.currentUser.city);
    console.log(this.currentUser.specialties);
    console.log(this.currentUser.insurances);
    this.yearRange = this.getYearRange();
    this._commonService.getCities().subscribe((cities) => {
      this.cities = cities.sort((city1, city2) =>
        city1.name < city2.name ? -1 : 1
      );
    });
    this._commonService.getSpecialities().subscribe((specialities) => {
      this.specialities = specialities.sort((speciality1, speciality2) =>
        speciality1.name < speciality2.name ? -1 : 1
      );
    });
    this._commonService.getInsurances().subscribe((insurances) => {
      this.insurances = insurances.sort((insurance1, insurance2) =>
        insurance1.name < insurance2.name ? -1 : 1
      );
    });
  }

  getYearRange(): string {
    const start = moment().subtract(90, 'years').year();
    const end = moment().subtract(13, 'years').year();
    return `${start}:${end}`;
  }

  submit() {
    this._doctorService
      .updateDoctor(this.currentUser, this.currentUser.id)
      .subscribe((user) => {
        this._toastService.showSuccess(
          'Success',
          'Profile updated successfully.'
        );
        this.currentUser = user;
        this._doctorDashboard.currentUser = user;
      });
  }
}
