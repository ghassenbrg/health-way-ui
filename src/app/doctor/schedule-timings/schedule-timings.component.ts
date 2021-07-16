import { Component, OnInit } from '@angular/core';
import { TimeSheet } from '@models/timeSheet.model';
import { DoctorService } from '@services-api/doctor.service';
import { DoctorDashboardContainerComponent } from '../doctor-dashboard-container/doctor-dashboard-container.component';

@Component({
  selector: 'app-schedule-timings',
  templateUrl: './schedule-timings.component.html',
  styleUrls: ['./schedule-timings.component.scss'],
})
export class ScheduleTimingsComponent implements OnInit {
  currentUser: any;
  timeSheets = {
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  };
  selectedDay: string = 'Monday';
  constructor(
    private _doctorService: DoctorService,
    private _doctorDashboard: DoctorDashboardContainerComponent
  ) {}

  ngOnInit(): void {
    this.currentUser = this._doctorDashboard.currentUser;
    this._doctorService
      .getDoctorTimeSheet(this.currentUser.id)
      .subscribe((response) => {
        console.log(response);
        response.forEach((slot) => {
          let customSlot = slot;
          customSlot.startTime = new Date('2021-07-17T' + customSlot.startTime);
          customSlot.endTime = new Date('2021-07-17T' + customSlot.endTime);
          this.timeSheets[customSlot.day] = customSlot;
        });
      });
  }
}
