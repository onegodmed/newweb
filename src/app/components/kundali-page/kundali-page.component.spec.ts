import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundaliPageComponent } from './kundali-page.component';

describe('KundaliPageComponent', () => {
  let component: KundaliPageComponent;
  let fixture: ComponentFixture<KundaliPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KundaliPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KundaliPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
