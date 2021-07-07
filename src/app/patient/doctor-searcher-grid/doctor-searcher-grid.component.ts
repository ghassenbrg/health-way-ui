import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-searcher-grid',
  templateUrl: './doctor-searcher-grid.component.html',
  styleUrls: ['./doctor-searcher-grid.component.scss']
})
export class DoctorSearcherGridComponent implements OnInit {

  @Input() doctors: any;
  @Input() pageSize: number;

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

  viewDoctorProfile(id: number) {
    this.route.navigate(['/doctor-profile', { identifier: id }]);
  }

  bookAppointment(id: number) {
    this.route.navigate(['/booking', { identifier: id }]);
  }

}
