
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TIME_SHEET_MOCK } from '@app/common/mocks/timeSheet.mock';
import { TimeSheet } from '@models/timeSheet.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  timeSheet: TimeSheet[] = TIME_SHEET_MOCK;
  newDate: Date = new Date();

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.prepareTimings();
  }

  prepareTimings() {
    let minutesToAdd = 30;
    let currentTiming: Date;

    this.timeSheet.forEach(element => {
      element.timings = [];
      currentTiming = new Date(element.startTime);
      // timing format HH:mm
      element.timings.push({ time: currentTiming.toLocaleTimeString() });
      for (let i = 0; currentTiming.toLocaleTimeString() < new Date(element.endTime).toLocaleTimeString(); i++) {
        currentTiming = new Date(currentTiming.getTime() + minutesToAdd * 60000);
        element.timings.push({ time: currentTiming.toLocaleTimeString() });
      }
    });
    console.log('timeSheet', this.timeSheet)

  }

  chooseTiming(timeSheetId, time) {
    this.timeSheet.find(time => time.id == timeSheetId).timings.forEach(timing => {
      if (timing.time == time) {
        timing.isSelected = true;
      }
      else {
        timing.isSelected = false;
      }
    })
  }

  proceed() {
    this.route.navigate(['/checkout']);
  }
}