import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWithAstrologerComponent } from './chat-with-astrologer.component';

describe('ChatWithAstrologerComponent', () => {
  let component: ChatWithAstrologerComponent;
  let fixture: ComponentFixture<ChatWithAstrologerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatWithAstrologerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatWithAstrologerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
