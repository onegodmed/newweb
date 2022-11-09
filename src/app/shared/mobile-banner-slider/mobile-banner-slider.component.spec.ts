import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBannerSliderComponent } from './mobile-banner-slider.component';

describe('MobileBannerSliderComponent', () => {
  let component: MobileBannerSliderComponent;
  let fixture: ComponentFixture<MobileBannerSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileBannerSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileBannerSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
