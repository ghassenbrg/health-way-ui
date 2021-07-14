import { DOCTORS_MOCK } from '../../common/mocks/doctor.mock';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@services-api/doctor.service';
import { Doctor } from '@models/doctor.model';
@Component({
  selector: 'app-map-searcher',
  templateUrl: './map-searcher.component.html',
  styleUrls: ['./map-searcher.component.scss'],
})
export class MapSearcherComponent implements OnInit {

  showLoader: boolean;
  filters: any[] = [
    { name: 'Rating', code: 'NY' },
    { name: 'Popular', code: 'RM' },
    { name: 'Latest', code: 'LDN' },
    { name: 'Free', code: 'IST' },
  ];

  isListMode: boolean = false;
  lat = 35.720065;
  lng = 10.649893;
  markers: any[] = [
    {
      lat: 36.673858,
      lng: 10.815982,
      label: 'A',
      draggable: true,
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false,
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true,
    },
  ];
  pageSize: number = 2;

  doctors: Doctor[];

  geocoder: any;

  constructor(private _doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.showLoader = true;
    this._doctorService.getAll().subscribe(res => {
      this.showLoader = false;
      this.doctors = res;
      this.initializeRating();
    }, err => {
      this.showLoader = false;
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

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
    this.findLocation('london')
  }

  findLocation(address) {
    this.geocoder= new google.maps.Geocoder();

    if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  }

  loadMore() {
    this.pageSize = this.pageSize + 2;
  }
}
