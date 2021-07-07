import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSearcherListComponent } from './doctor-searcher-list.component';

describe('DoctorSearcherListComponent', () => {
  let component: DoctorSearcherListComponent;
  let fixture: ComponentFixture<DoctorSearcherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSearcherListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSearcherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
