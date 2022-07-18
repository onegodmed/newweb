import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPayPopupComponent } from './process-pay-popup.component';

describe('ProcessPayPopupComponent', () => {
  let component: ProcessPayPopupComponent;
  let fixture: ComponentFixture<ProcessPayPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessPayPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessPayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
