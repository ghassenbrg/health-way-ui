import { Component, OnInit } from '@angular/core';
import { Feedback } from '@models/feedback.model';
import { DoctorService } from '@services-api/doctor.service';
import { DoctorDashboardContainerComponent } from '../doctor-dashboard-container/doctor-dashboard-container.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  currentUser: any;
  feedbacks: Feedback[];
  ratingAverage: number;
  pageSize: number = 3;

  constructor(
    private _doctorDashboard: DoctorDashboardContainerComponent,
    private _doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.currentUser = this._doctorDashboard.currentUser;
    this.getDoctorReviews(this.currentUser.id);
  }
  getDoctorReviews(identifier) {
    this._doctorService.getDoctorfeedbacks(identifier).subscribe(
      (res) => {
        this.feedbacks = res;
        this.calculateRateAverage(this.feedbacks);
      },
      (err) => {}
    );
  }

  calculateRateAverage(feedbacks) {
    let raitingSum = 0;
    feedbacks.forEach((feedBack) => {
      raitingSum += feedBack.rating;
    });
    this.ratingAverage = raitingSum / feedbacks.length;
    return this.ratingAverage;
  }

  loadMore() {
    this.pageSize = this.feedbacks.length;
  }
}
