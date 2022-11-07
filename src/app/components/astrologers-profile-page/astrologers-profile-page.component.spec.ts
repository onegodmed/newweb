import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrologersProfilePageComponent } from './astrologers-profile-page.component';

describe('AstrologersProfilePageComponent', () => {
  let component: AstrologersProfilePageComponent;
  let fixture: ComponentFixture<AstrologersProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstrologersProfilePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstrologersProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
