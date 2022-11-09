import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanchangPageComponent } from './panchang-page.component';

describe('PanchangPageComponent', () => {
  let component: PanchangPageComponent;
  let fixture: ComponentFixture<PanchangPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanchangPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanchangPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
