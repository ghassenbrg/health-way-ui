import { AgmMap } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-map-grid',
  templateUrl: './map-grid.component.html',
  styleUrls: ['./map-grid.component.scss']
})
export class MapGridComponent implements OnInit {


  lat = 51.678418;
  lng = 7.809007;
  
  @ViewChild(AgmMap) public agmMap: AgmMap;


  constructor() { }

  ngOnInit(): void {

  }



}
