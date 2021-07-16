import { Insurance } from './../../core/models/insurance.model';
import { cloneDeep } from 'lodash/cloneDeep';
import { Doctor } from './../../core/models/doctor.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DOCTORS_MOCK } from '@app/common/mocks/doctor.mock';
import { DoctorService } from '@services-api/doctor.service';
import { LoaderService } from '@services/loader.service';
import { CommonService } from '@services/common.service';
import { City } from '@models/city.model';
import { Speciality } from '@models/specialty.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  doctors: Doctor[];
  allDoctors: Doctor[];
  pageSize: number = 5;
  filters: any[] = [
    { name: 'Rating', code: 'NY' },
    { name: 'Popular', code: 'RM' },
    { name: 'Latest', code: 'LDN' },
    { name: 'Free', code: 'IST' },
  ];
  maleCriteria: boolean;
  femaleCriteria: boolean;
  cities: City[];
  insurances: Insurance[];
  specialities: Speciality[];
  selectedSpecialities: Speciality[];

  constructor(
    private _commonService: CommonService,
    private route: Router,
    private _doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this._doctorService.getAll().subscribe(res => {
      this.doctors = res;
      this.allDoctors = Object.assign([], this.doctors)
      this.initializeRating();
      this.prepareCities();
      this.prepareInsurances();
      this.prepareSpecialities();
    }, err => {

    })
  }

  initializeRating() {
    this.doctors.forEach((doctor) => {
      doctor.ratingAverage = this.calculateRateAverage(doctor.feedbacks);
    });
  }

  calculateRateAverage(feedBacks: any) {
    let raitingSum = 0;
    feedBacks.forEach((feedBack) => {
      raitingSum += feedBack.rating;
    });
    return raitingSum / feedBacks.length;
  }


  filterDoctors() {
    // let selectedSpecialities: string[] = [];
    // this.specialities.forEach(speciality => {
    //   if (speciality.isSelected) {
    //     selectedSpecialities.push(speciality.name);
    //   }
    // })
    // this._doctorService.getDoctorsBySpeciality(selectedSpecialities).subscribe(res => {
    //   this.doctors = res;
    // }, err => {

    // })
    this.doctors = [];
    if (this.maleCriteria && !this.femaleCriteria) {
      this.allDoctors.forEach(doctor => {
        if (doctor.gender.toLowerCase() == 'male') {
          this.doctors.push(doctor)
        }
      });
    }
    else if (this.femaleCriteria && !this.maleCriteria) {
      this.allDoctors.forEach(doctor => {
        if (doctor.gender.toLowerCase() == 'female') {
          this.doctors.push(doctor)
        }
      });
    }
    else {
      this.doctors = this.allDoctors;
    }
  }

  loadMore() {
    this.pageSize = this.pageSize + 2;
  }

  viewDoctorProfile(id: number) {
    this.route.navigate(['/doctor-profile', { identifier: id }]);
  }

  bookAppointment(id: number) {
    this.route.navigate(['/booking', { identifier: id }]);
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
    }, err => {
    })
  }

  prepareSpecialities() {
    this._commonService.getSpecialities().subscribe(res => {
      this.specialities = res;
      for (let i = 0; i < this.doctors.length; i++) {
        if (this.doctors[i].specialties && this.doctors[i].specialties.length > 0) {
          this.doctors[i].specialtyNames = [];
          this.doctors[i].specialties.forEach(speciality => {
            speciality = this.getSpecialityId(speciality);
            this.doctors[i].specialtyNames.push(this.specialities.find(specialityDef => specialityDef.id == +speciality).name);
          })
        }
      }
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
            this.doctors[i].insuranceNames.push(this.insurances.find(insuranceDef => insuranceDef.id == +insurance).name);
          })
        }
      }
    }, err => {

    })
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
