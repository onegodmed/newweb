import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrologerCallPopupComponent } from './astrologer-call-popup.component';

describe('AstrologerCallPopupComponent', () => {
  let component: AstrologerCallPopupComponent;
  let fixture: ComponentFixture<AstrologerCallPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstrologerCallPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstrologerCallPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
