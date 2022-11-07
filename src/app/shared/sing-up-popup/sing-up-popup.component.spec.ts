import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpPopupComponent } from './sing-up-popup.component';

describe('SingUpPopupComponent', () => {
  let component: SingUpPopupComponent;
  let fixture: ComponentFixture<SingUpPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingUpPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingUpPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
