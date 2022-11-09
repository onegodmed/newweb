import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkToAstrologerComponent } from './talk-to-astrologer.component';

describe('TalkToAstrologerComponent', () => {
  let component: TalkToAstrologerComponent;
  let fixture: ComponentFixture<TalkToAstrologerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalkToAstrologerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalkToAstrologerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
