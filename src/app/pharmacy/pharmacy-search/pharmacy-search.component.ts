import { City } from './../../core/models/city.model';
import { CommonService } from './../../core/services/common.service';
import { Component, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PharmacyService } from '@services-api/pharmacy.service';
@Component({
  selector: 'app-pharmacy-search',
  templateUrl: './pharmacy-search.component.html',
  styleUrls: ['./pharmacy-search.component.scss']
})
export class PharmacySearchComponent implements OnInit {
  selectedCity: any;
  items: any[];
  pharmacies: any[];
  pageSize: number = 5;
  constructor(private service: CommonService, private servicesP: PharmacyService) { }
  displayBasic: boolean = false;
  displayBasicVacc: boolean = false;

  ngOnInit(): void {
    this.service.getCities().subscribe(cities => {
      this.items = cities.sort((city1, city2) => city1.name < city2.name ? -1 : 1)

    });
    this.servicesP.getAll().subscribe(pharmasy => {
      this.pharmacies = pharmasy
      console.log(this.pharmacies);

    })
  }
  showPcrDialog() {
    this.displayBasic = true;
  }
  showPcrDialogVacc() {
    this.displayBasicVacc = true;
  }
  loadMore() {
    this.pageSize = this.pageSize + 2;
  }
  booking:any []
  bookingPcr(event) {
    console.log(event);
this.booking = event
  }
 /*  confirmPcr(){
    this.servicesP.createPcr().subscribe
  } */
}
