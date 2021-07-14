import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcrTestComponent } from './pcr-test.component';

describe('PcrTestComponent', () => {
  let component: PcrTestComponent;
  let fixture: ComponentFixture<PcrTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcrTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcrTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
