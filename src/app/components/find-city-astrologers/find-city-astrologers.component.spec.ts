import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCityAstrologersComponent } from './find-city-astrologers.component';

describe('FindCityAstrologersComponent', () => {
  let component: FindCityAstrologersComponent;
  let fixture: ComponentFixture<FindCityAstrologersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindCityAstrologersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindCityAstrologersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
