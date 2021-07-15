import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { Doctor } from '@models/doctor.model';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent implements OnInit {
  currentUser: Doctor = new Doctor();
  showLoader: boolean = true;

  constructor(private _auth: AuthenticationService) {}

  ngOnInit(): void {
    this.currentUser = this._auth.currentUser;
  }
}
