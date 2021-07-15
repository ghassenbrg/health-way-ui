import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-searcher-grid',
  templateUrl: './doctor-searcher-grid.component.html',
  styleUrls: ['./doctor-searcher-grid.component.scss'],
})
export class DoctorSearcherGridComponent implements OnInit {
  @Input() doctors: any;
  @Input() pageSize: number;

  constructor(private route: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.doctors && this.doctors) {
      this.initializeRating();
    }
  }

  initializeRating() {
    this.doctors.forEach((doctor) => {
      doctor.ratingAverage = this.calculateRateAverage(doctor.feedBacks);
    });
  }

  calculateRateAverage(feedBacks: any[]) {
    let ratingSum = 0;
    if (feedBacks) {
      feedBacks.forEach((feedBack) => {
        ratingSum += feedBack.rating;
      });
      return ratingSum / feedBacks.length;
    }
    return ratingSum;
  }

  viewDoctorProfile(id: number) {
    this.route.navigate(['/doctor-profile', { identifier: id }]);
  }

  bookAppointment(id: number) {
    this.route.navigate(['/booking', { identifier: id }]);
  }
}
