import { ToastService } from './../../core/services/toast.service';
import { PatientService } from '@services-api/patient.service';
import { CommonService } from '@services/common.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { City } from '@models/city.model';
import { Patient } from '@models/patient.model';
import { AuthenticationService } from '@auth/_services/authentication.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  @Input() currentUser: Patient;
  @Output() onSubmitPatient: EventEmitter<any> = new EventEmitter();

  birthDate: Date;
  cities: City[];
  
  constructor(
    private _commonService: CommonService,
    private _patientService: PatientService,
    private _toastService: ToastService,
    private _auth: AuthenticationService) { }

  ngOnInit(): void {
    this.birthDate = new Date(this.currentUser.birthDate);
    this.prepareCities();
  }

  prepareCities() {
    this.currentUser.city = this.getCityId(this.currentUser.city);
    this._commonService.getCities().subscribe(res => {
      this.cities = res;
      console.log( this.currentUser)
    }, err => {
    })
  }

  submit() {
    this.currentUser.birthDate = moment(this.birthDate).format('YYYY-MM-DD');
    this._patientService
      .updatePatient(this.currentUser, this.currentUser.id.toString())
      .subscribe((user) => {
        this._toastService.showSuccess(
          'Success',
          'Profile updated successfully.'
        );
        this.currentUser = user;
        this.onSubmitPatient.emit(this.currentUser);
      });
  }

  getCityId(cityId) {
    if (cityId && cityId.includes('/api/cities/')) {
      return cityId.replace('/api/cities/', '');
    }
    else {
      return cityId;
    }
  }

}
