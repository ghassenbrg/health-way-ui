import { City } from './../../core/models/city.model';
import { CommonService } from './../../core/services/common.service';
import { Component, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-pharmacy-search',
  templateUrl: './pharmacy-search.component.html',
  styleUrls: ['./pharmacy-search.component.scss']
})
export class PharmacySearchComponent implements OnInit {
  selectedCity: any;
  items: any[];
  constructor(private service : CommonService) { }

  ngOnInit(): void {
    this.service.getCities().subscribe(cities =>{
      this.items=cities.sort((city1,city2)=>city1.name<city2.name?-1:1)

    })
  }

}
