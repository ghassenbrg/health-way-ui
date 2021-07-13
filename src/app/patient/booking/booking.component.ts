import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TIME_SHEET_MOCK } from '@app/common/mocks/timeSheet.mock';
import { TimeSheet } from '@models/timeSheet.model';
import * as moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})

export class BookingComponent implements OnInit {

  timeSheet: TimeSheet[] = TIME_SHEET_MOCK;
  newDate: Date = new Date();
  calendar: Calendar[] = []
  appointmentCalander: any = [];

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.prepareSlots();
  }

  prepareSlots() {
    let minutesToAdd = 30;
    let currentSlotSeconds: number;
    let currentSlot: string;

    this.timeSheet.forEach((element) => {
      element.slots = [];
      currentSlotSeconds = this.convertToSeconds(element.startTime);
      for ( let i = 0; currentSlotSeconds < this.convertToSeconds(element.endTime); i++) {
        currentSlot = moment().hour(0).minute(0).seconds(currentSlotSeconds).add(minutesToAdd,'minutes').format("HH:mm:ss");
        element.slots.push({ time: currentSlot });
        currentSlotSeconds = this.convertToSeconds(currentSlot);
      }
    });
    this.buildCalendar();
  }

  convertToSeconds(time) {
    let splittedTime = time.toString().split(":");
    return (+splittedTime[0]) * 60 * 60 + (+splittedTime[1]) * 60 + (+splittedTime[2]);
  }

  chooseTiming(date: Date, time: string) {
    this.calendar.forEach((day) => {
      day.slots.forEach((slot) => {
        slot.isSelected = false;
      });
    });
    this.calendar.find((day) => day.date == date).slots.forEach(slot => {
      if (slot.time == time) {
        slot.isSelected = true;
      }
    });  
  }

  getDates(startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
    }
    return dates
  }

  buildCalendar() {
    let daysOfWeeks: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    
    let calendarDates: Date[] = this.getDates(new Date(), new Date().setDate(new Date().getDate() + 30));
    calendarDates.forEach(date => {
      this.calendar.push({date: date})
    });
    this.calendar.forEach(element => {
      element.slots = this.timeSheet.find(timesheet => timesheet.day == daysOfWeeks[element.date.getDay()]) ? cloneDeep(this.timeSheet.find(timesheet => timesheet.day == daysOfWeeks[element.date.getDay()]).slots) : []
    });
  }

  proceed() {
    this.route.navigate(['/checkout']);
  }

}
export class Calendar {
    date?: Date;
    slots?: any
}

