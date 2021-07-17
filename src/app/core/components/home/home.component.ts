import { DoctorService } from '@services-api/doctor.service';
import { Speciality } from '@models/specialty.model';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '@services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  doctors: any;
  specialities: Speciality[];
  responsiveOptions: any = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private _commonService: CommonService,
    private _doctorService: DoctorService,
    private router: Router) {}

  ngOnInit(): void {
    this.getSpecialities();
    this.getDoctors();
  }

  getSpecialities() {
    if (!this.specialities) {
      this._commonService.getSpecialities().subscribe(res => {
        this.specialities = res;
      }, err => {

      })
    }
    else {
    }
  }

  getDoctors() {
    this._doctorService.getAll().subscribe(res => {
      this.doctors = res;
    }, err => {

    })
  }

  viewDoctorProfile(id: number) {
    this.router.navigate(['/doctor-profile', { identifier: id }]);
  }

  bookAppointment(id: number) {
    this.router.navigate(['/booking', { identifier: id }]);
  }

}
