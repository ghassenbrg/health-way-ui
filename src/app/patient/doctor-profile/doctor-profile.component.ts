import { DoctorService } from '@services-api/doctor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '@models/doctor.model';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  doctorIdentifier: string;
  doctor: Doctor;

  constructor(
    private route: ActivatedRoute,
    private _doctorService: DoctorService,
    private _loader: LoaderService) { }

  ngOnInit(): void {
    this.doctorIdentifier = this.route.snapshot.params.identifier;
    this.getDoctorData(this.doctorIdentifier);
  }

  getDoctorData(identifier) {
    this._loader.show();
    this._doctorService.getDoctorById(identifier).subscribe(res => {
      this._loader.hide();
      this.doctor = res;
      console.log(this.doctor)
    }, err => {
      this._loader.hide();
    })
  }

}
