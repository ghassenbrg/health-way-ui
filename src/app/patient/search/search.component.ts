import { cloneDeep } from 'lodash/cloneDeep';
import { Doctor } from './../../core/models/doctor.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DOCTORS_MOCK } from '@app/common/mocks/doctor.mock';
import { DoctorService } from '@services-api/doctor.service';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  doctors: Doctor[];
  allDoctors: Doctor[];
  pageSize: number = 2;
  filters: any[] = [
    { name: 'Rating', code: 'NY' },
    { name: 'Popular', code: 'RM' },
    { name: 'Latest', code: 'LDN' },
    { name: 'Free', code: 'IST' },
  ];
  maleCriteria: boolean;
  femaleCriteria: boolean;

  constructor(
    private _loader: LoaderService,
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
    this.doctors = [];
    if (this.maleCriteria && !this.femaleCriteria) {
      this.allDoctors.forEach(doctor => {
        if (doctor.gender == 'male') {
          this.doctors.push(doctor)
        }
      });
    }
    else if (this.femaleCriteria && !this.maleCriteria) {
      this.allDoctors.forEach(doctor => {
        if (doctor.gender == 'female') {
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
}
