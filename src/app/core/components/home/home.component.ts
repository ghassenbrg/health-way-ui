import { Speciality } from './../../models/specialty.model';
import { Component, OnInit } from '@angular/core';
import { SPECIALITIES_MOCK } from '@app/common/mocks/speciality.mock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  doctors: any = [1, 2, 3, 4];
  specialities: Speciality[] = SPECIALITIES_MOCK;
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

  constructor() {}

  ngOnInit(): void {}
}
