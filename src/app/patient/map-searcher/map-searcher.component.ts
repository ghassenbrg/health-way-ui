import { Speciality } from '@models/specialty.model';
import { Insurance } from './../../core/models/insurance.model';
import { CommonService } from './../../core/services/common.service';
import { DOCTORS_MOCK } from '../../common/mocks/doctor.mock';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@services-api/doctor.service';
import { Doctor } from '@models/doctor.model';
import * as cities from '../../_files/cities.json';10.088530
import { LoaderService } from '@services/loader.service';
import { City } from '@models/city.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-map-searcher',
  templateUrl: './map-searcher.component.html',
  styleUrls: ['./map-searcher.component.scss'],
})
export class MapSearcherComponent implements OnInit {

  doctors: Doctor[];
  lat = 35.720065;
  lng = 10.649893;
  isListMode: boolean = false;
  pageSize: number = 6;
  cities: City[];
  insurances: Insurance[];
  citiesLocation: any = (cities as any).default;
  specialities: Speciality[];

  constructor(
    private _commonService: CommonService,
    private _doctorService: DoctorService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this._doctorService.getAll().subscribe(res => {
      this.doctors = res;
      this.prepareCities();
      this.prepareInsurances();
      this.prepareSpecialities();
    }, err => {

    })
  }

  prepareCities() {
    this._commonService.getCities().subscribe(res => {
      this.cities = res;
      this.doctors.forEach(doctor => {
        if (doctor.city) {
          doctor.city = this.getCityId(doctor.city);
          doctor.cityName = this.cities.find(city => city.id == +doctor.city).name;
        }
      })
      this.prepareCityLatLng();
    }, err => {

    })
  }

  prepareInsurances() {
    this._commonService.getInsurances().subscribe(res => {
      this.insurances = res;
      for (let i = 0; i < this.doctors.length; i++) {
        if (this.doctors[i].insurances && this.doctors[i].insurances.length > 0) {
          this.doctors[i].insuranceNames = [];
          this.doctors[i].insurances.forEach(insurance => {
            insurance = this.getInsuranceId(insurance);
            if (this.insurances.find(insurance => insurance.id == +insurance)) {
              this.doctors[i].insuranceNames.push(this.insurances.find(insurance => insurance.id == +insurance).name);
            }
          })
        }
      }
    }, err => {

    })
  }

  prepareSpecialities() {
    if (!this.specialities) {
      this._commonService.getSpecialities().subscribe(res => {
        this.specialities = res;
        this.initializeSpeciality();
      }, err => {

      })
    }
    else {
      this.initializeSpeciality();
    }
  }

  initializeSpeciality() {
    for (let i = 0; i < this.doctors.length; i++) {
      if (this.doctors[i].specialties && this.doctors[i].specialties.length > 0) {
        this.doctors[i].specialtyNames = [];
        this.doctors[i].specialties.forEach(speciality => {
          speciality = this.getSpecialityId(speciality);
          this.doctors[i].specialtyNames.push(this.specialities.find(specialityDef => specialityDef.id == +speciality).name);
        })
      }
    }
  }

  prepareCityLatLng() {
    this.doctors.forEach(doc => {
      if (this.citiesLocation.find(city => city.name == doc.cityName)) {
        doc.citylat = this.citiesLocation.find(city => city.name == doc.cityName).lat;
        doc.citylng = this.citiesLocation.find(city => city.name == doc.cityName).lng;
      }
    });
  }

  loadMore() {
    this.pageSize = this.pageSize + 2;
  }

  viewDoctorProfile(id: number) {
    this.router.navigate(['/doctor-profile', { identifier: id }]);
  }

  getCityId(cityId) {
    if (cityId.includes('/api/cities/')) {
      return cityId.replace('/api/cities/', '');
    }
    else {
      return cityId;
    }
  }

  getInsuranceId(cityId) {
    if (cityId.includes('/api/insurances/')) {
      return cityId.replace('/api/insurances/', '');
    }
    else {
      return cityId;
    }
  }

  getSpecialityId(cityId) {
    if (cityId.includes('/api/specialties/')) {
      return cityId.replace('/api/specialties/', '');
    }
    else {
      return cityId;
    }
  }
 

}
