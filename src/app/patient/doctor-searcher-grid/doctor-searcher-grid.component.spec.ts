import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSearcherGridComponent } from './doctor-searcher-grid.component';

describe('DoctorSearcherGridComponent', () => {
  let component: DoctorSearcherGridComponent;
  let fixture: ComponentFixture<DoctorSearcherGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSearcherGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSearcherGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
