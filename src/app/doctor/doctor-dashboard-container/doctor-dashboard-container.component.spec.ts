import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDashboardContainerComponent } from './doctor-dashboard-container.component';

describe('DoctorDashboardContainerComponent', () => {
  let component: DoctorDashboardContainerComponent;
  let fixture: ComponentFixture<DoctorDashboardContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorDashboardContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDashboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
