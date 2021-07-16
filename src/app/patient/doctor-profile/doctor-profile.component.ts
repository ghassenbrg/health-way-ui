import { Insurance } from './../../core/models/insurance.model';
import { Speciality } from '@models/specialty.model';
import { Feedback } from './../../core/models/feedback.model';
import { DoctorService } from '@services-api/doctor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '@models/doctor.model';
import { CommonService } from '@services/common.service';
import { City } from '@models/city.model';
import { AuthenticationService } from '@auth/_services/authentication.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  doctorIdentifier: string;
  currentUserIdentifier: string;
  doctor: Doctor;
  feedbacks: Feedback[];
  pageSize: number = 3;
  ratingAverage: number;
  cities: City[];
  specialities: Speciality[];
  insurances: Insurance[];
  raiting: number;
  feedback: Feedback = new Feedback();;
  feedbackComment: string;

  constructor(
    private route: ActivatedRoute,
    private _doctorService: DoctorService,
    private _commonService: CommonService,
    private _auth: AuthenticationService) { }

  ngOnInit(): void {
    this.doctorIdentifier = this.route.snapshot.params.identifier;
    this.getDoctorData(this.doctorIdentifier);
    this.currentUserIdentifier = this._auth.currentUser.id;
  }

  getDoctorData(identifier) {
    this._doctorService.getDoctorById(identifier).subscribe(res => {
      this.doctor = res;
      this.prepareCities();
      this.prepareSpecialities();
      this.prepareInsurances();
      this.getDoctorReviews(this.doctorIdentifier);
    }, err => {

    })
  }

  getDoctorReviews(identifier) {
    this._doctorService.getDoctorfeedbacks(identifier).subscribe(res => {
      this.feedbacks = res;
      this.calculateRateAverage(this.feedbacks);
    }, err => {

    })
  }

  calculateRateAverage(feedbacks) {
    let raitingSum = 0;
    feedbacks.forEach((feedBack) => {
      raitingSum += feedBack.rating;
    });
    this.ratingAverage = raitingSum / feedbacks.length;
    return this.ratingAverage;
  }

  prepareCities() {
    this._commonService.getCities().subscribe(res => {
      this.cities = res;
      if (this.doctor.city) {
        this.doctor.city = this.getCityId(this.doctor.city);
        this.doctor.cityName = this.cities.find(city => city.id == +this.doctor.city).name;
      }
    }, err => {
    })
  }

  prepareSpecialities() {
    this._commonService.getSpecialities().subscribe(res => {
      this.specialities = res;
        if (this.doctor.specialties && this.doctor.specialties.length > 0) {
          this.doctor.specialtyNames = [];
          this.doctor.specialties.forEach(speciality => {
            speciality = this.getSpecialityId(speciality);
            this.doctor.specialtyNames.push(this.specialities.find(specialityDef => specialityDef.id == +speciality).name);
          })
        
      }
    }, err => {

    })
  }

  prepareInsurances() {
    this._commonService.getInsurances().subscribe(res => {
      this.insurances = res;
      if (this.doctor.insurances && this.doctor.insurances.length > 0) {
        this.doctor.insuranceNames = [];
        this.doctor.insurances.forEach(insurance => {
          insurance = this.getInsuranceId(insurance);
          this.doctor.insuranceNames.push(this.insurances.find(insuranceDef => insuranceDef.id == +insurance).name);
        })
      }
    }, err => {

    })
  }

  addReview() {
    this.feedback.doctor = this.doctorIdentifier;
    this.feedback.patient = this.currentUserIdentifier;
    this._doctorService.addFeedback(this.feedback).subscribe(res => {
      this.feedback = new Feedback();
      this.getDoctorReviews(this.doctorIdentifier);
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
