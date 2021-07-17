import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pcr-test',
  templateUrl: './pcr-test.component.html',
  styleUrls: ['./pcr-test.component.scss']
})
export class PcrTestComponent implements OnInit {
time :string;
date : any;
lname:string;
fname: string;
cin: number;
  constructor() { }

  ngOnInit(): void {
  }

}
