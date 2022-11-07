import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUserPageComponent } from './follow-user-page.component';

describe('FollowUserPageComponent', () => {
  let component: FollowUserPageComponent;
  let fixture: ComponentFixture<FollowUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowUserPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
