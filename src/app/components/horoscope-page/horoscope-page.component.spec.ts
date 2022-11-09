import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoroscopePageComponent } from './horoscope-page.component';

describe('HoroscopePageComponent', () => {
  let component: HoroscopePageComponent;
  let fixture: ComponentFixture<HoroscopePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoroscopePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoroscopePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
