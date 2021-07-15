import { DOCTORS_MOCK } from '../../common/mocks/doctor.mock';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@services-api/doctor.service';
import { Doctor } from '@models/doctor.model';
import * as cities from '../../_files/cities.json';10.088530

@Component({
  selector: 'app-map-searcher',
  templateUrl: './map-searcher.component.html',
  styleUrls: ['./map-searcher.component.scss'],
})
export class MapSearcherComponent implements OnInit {

  showLoader: boolean;
  doctors: Doctor[];
  lat = 35.720065;
  lng = 10.649893;
  filters: any[] = [
    { name: 'Rating', code: 'NY' },
    { name: 'Popular', code: 'RM' },
    { name: 'Latest', code: 'LDN' },
    { name: 'Free', code: 'IST' },
  ];
  isListMode: boolean = false;
  pageSize: number = 2;
  citiesLocation: any = (cities as any).default;

  constructor(private _doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.showLoader = true;
    this._doctorService.getAll().subscribe(res => {
      this.showLoader = false;
      this.doctors = res;
      this.prepareCityLatLng();
      this.initializeRating();
    }, err => {
      this.showLoader = false;
    })
  }

  prepareCityLatLng() {
    this.doctors.forEach(doc => {
      if (this.citiesLocation.find(city => city.name == doc.city)) {
        doc.citylat = this.citiesLocation.find(city => city.name == doc.city).lat;
        doc.citylng = this.citiesLocation.find(city => city.name == doc.city).lng;
      }
    });
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

  clickedMarker(label: string, index: number) {
    //to do
  }

  loadMore() {
    this.pageSize = this.pageSize + 2;
  }
}
