import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { Appointment } from '@models/appointment.model';
import { Patient } from '@models/patient.model';
import { AppointmentService } from '@services-api/appointment.service';

@Component({
  selector: 'app-patient-summary',
  templateUrl: './patient-summary.component.html',
  styleUrls: ['./patient-summary.component.scss']
})
export class PatientSummaryComponent implements OnInit {

  currentUser: any;
  appointmentsList: Appointment[] = [];

  constructor(    
    private _auth: AuthenticationService,
    private _appointmentService: AppointmentService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this._auth.currentUser;
    this.getAppointments();
  }

  getAppointments() {
    this._appointmentService
      .getAppointmentsByPatient(this.currentUser.id)
      .subscribe((appointments) => {
        this.appointmentsList = appointments;
      });
  }

  viewDoctorProfile(id: number) {
    this.router.navigate(['/doctor-profile', { identifier: id }]);
  }

}
