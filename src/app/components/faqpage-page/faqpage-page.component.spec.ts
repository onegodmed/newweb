import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqpagePageComponent } from './faqpage-page.component';

describe('FaqpagePageComponent', () => {
  let component: FaqpagePageComponent;
  let fixture: ComponentFixture<FaqpagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqpagePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqpagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
