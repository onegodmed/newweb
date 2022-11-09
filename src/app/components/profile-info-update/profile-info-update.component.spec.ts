import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoUpdateComponent } from './profile-info-update.component';

describe('ProfileInfoUpdateComponent', () => {
  let component: ProfileInfoUpdateComponent;
  let fixture: ComponentFixture<ProfileInfoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInfoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileInfoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
