import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@services-api/doctor.service';
import { ToastService } from '@services/toast.service';
import { DoctorDashboardContainerComponent } from '../doctor-dashboard-container/doctor-dashboard-container.component';

@Component({
  selector: 'app-schedule-timings',
  templateUrl: './schedule-timings.component.html',
  styleUrls: ['./schedule-timings.component.scss'],
})
export class ScheduleTimingsComponent implements OnInit {
  currentUser: any;
  timeSheets = {
    Sunday: {},
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {},
  };
  selectedDay: string = 'Monday';
  constructor(
    private _doctorService: DoctorService,
    private _toastService: ToastService,
    private _doctorDashboard: DoctorDashboardContainerComponent
  ) {}

  ngOnInit(): void {
    this.currentUser = this._doctorDashboard.currentUser;
    this._doctorService
      .getDoctorTimeSheet(this.currentUser.id)
      .subscribe((response) => {
        response.forEach((slot) => {
          this.setDates(slot);
        });
      });
  }

  setDates(slot: any) {
    slot.startTime = new Date('2021-07-17T' + slot.startTime);
    slot.endTime = new Date('2021-07-17T' + slot.endTime);
    this.timeSheets[slot.day] = slot;
  }
  saveSelected() {
    if (this.isValidTimeSheet(this.selectedDay)) {
      this.createOrUpdateTimeSheet(this.selectedDay);
    }
  }

  saveAll() {
    let isValid: boolean = true;
    for (const key of Object.keys(this.timeSheets)) {
      if (!this.isValidTimeSheet(key)) {
        isValid = false;
      }
    }
    if (isValid) {
      for (const key of Object.keys(this.timeSheets)) {
        this.createOrUpdateTimeSheet(key);
      }
    }
  }

  isValidTimeSheet(day: string): boolean {
    if (this.timeSheets[day].startTime && !this.timeSheets[day].endTime) {
      this._toastService.showError(
        'Error: ' + day,
        "If 'Start Time' is provided then 'End Time' is mandatory."
      );
      return false;
    } else if (
      !this.timeSheets[day].startTime &&
      this.timeSheets[day].endTime
    ) {
      this._toastService.showError(
        'Error: ' + day,
        "If 'End Time' is provided then 'Start Time' is mandatory."
      );
      return false;
    }
    return true;
  }
  createOrUpdateTimeSheet(day: string) {
    if (this.timeSheets[day].startTime && this.timeSheets[day].endTime) {
      this.timeSheets[day].startTime = new Date(
        this.timeSheets[day].startTime.getTime() -
          this.timeSheets[day].startTime.getTimezoneOffset() * 60000
      );
      this.timeSheets[day].endTime = new Date(
        this.timeSheets[day].endTime.getTime() -
          this.timeSheets[day].endTime.getTimezoneOffset() * 60000
      );
      this.timeSheets[day].doctor = this.currentUser.id;
      this.timeSheets[day].day = day;
      if (this.timeSheets[day].id) {
        this._doctorService
          .updateTimesheet(this.timeSheets[day], this.timeSheets[day].id)
          .subscribe((slot) => {
            this.setDates(slot);
            this._toastService.showSuccess(
              'Success',
              'TimeSheet with id: ' +
                this.timeSheets[day].id +
                ' was updated successfully.'
            );
          });
      } else {
        this._doctorService
          .createTimesheet(this.timeSheets[day])
          .subscribe((slot) => {
            this.setDates(slot);
            this._toastService.showSuccess(
              'Success',
              'TimeSheet was created successfully with id: ' + slot.id + '.'
            );
          });
      }
    }
  }
}
