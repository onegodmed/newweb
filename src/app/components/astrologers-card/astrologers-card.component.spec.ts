import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrologersCardComponent } from './astrologers-card.component';

describe('AstrologersCardComponent', () => {
  let component: AstrologersCardComponent;
  let fixture: ComponentFixture<AstrologersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstrologersCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstrologersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
