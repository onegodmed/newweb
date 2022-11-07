import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchMakingPageComponent } from './match-making-page.component';

describe('MatchMakingPageComponent', () => {
  let component: MatchMakingPageComponent;
  let fixture: ComponentFixture<MatchMakingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchMakingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchMakingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
