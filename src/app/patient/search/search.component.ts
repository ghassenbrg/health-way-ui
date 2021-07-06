import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DOCTORS_MOCK } from '@app/common/models/Doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  doctors: any[] = DOCTORS_MOCK;
  pageSize: number = 2;

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.initializeRating();
  }

  initializeRating() {
    this.doctors.forEach(doctor => {
      doctor.ratingAverage = this.calculateRateAverage(doctor.feedBacks);
    })
  }

  calculateRateAverage(feedBacks: any) {
    let raitingSum = 0;
    feedBacks.forEach(feedBack => {
      raitingSum += feedBack.rating; 
    });
    return raitingSum / feedBacks.length;
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