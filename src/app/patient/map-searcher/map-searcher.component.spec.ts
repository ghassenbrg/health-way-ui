import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSearcherComponent } from './map-searcher.component';

describe('MapGridComponent', () => {
  let component: MapSearcherComponent;
  let fixture: ComponentFixture<MapSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSearcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
