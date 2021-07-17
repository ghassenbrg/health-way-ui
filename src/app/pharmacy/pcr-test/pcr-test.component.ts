import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pcr-test',
  templateUrl: './pcr-test.component.html',
  styleUrls: ['./pcr-test.component.scss'],
})
export class PcrTestComponent implements OnInit {
  @Output() pcr: EventEmitter<any> = new EventEmitter();
  time: string;
  date: any;
  lname: string;
  fname: string;
  cin: number;
  constructor() {}

  ngOnInit(): void {

  }

  bookingPcr() {   
    this.pcr.emit({
      time: this.time,
      date: this.date,
      lastName: this.lname,
      firstName: this.fname,
      cin: this.cin,
    });
  }

}
