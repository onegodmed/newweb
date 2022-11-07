import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderClientsComponent } from './slider-clients.component';

describe('SliderComponent', () => {
  let component: SliderClientsComponent;
  let fixture: ComponentFixture<SliderClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
