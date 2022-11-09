import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumerologyPageComponent } from './numerology-page.component';

describe('NumerologyPageComponent', () => {
  let component: NumerologyPageComponent;
  let fixture: ComponentFixture<NumerologyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumerologyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumerologyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
