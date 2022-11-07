import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeAstrologyComponent } from './free-astrology.component';

describe('FreeAstrologyComponent', () => {
  let component: FreeAstrologyComponent;
  let fixture: ComponentFixture<FreeAstrologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeAstrologyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeAstrologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
