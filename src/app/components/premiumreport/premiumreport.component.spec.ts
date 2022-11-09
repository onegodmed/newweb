import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumreportComponent } from './premiumreport.component';

describe('PremiumreportComponent', () => {
  let component: PremiumreportComponent;
  let fixture: ComponentFixture<PremiumreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PremiumreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
