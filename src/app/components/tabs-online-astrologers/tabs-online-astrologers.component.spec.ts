import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsOnlineAstrologersComponent } from './tabs-online-astrologers.component';

describe('TabsOnlineAstrologersComponent', () => {
  let component: TabsOnlineAstrologersComponent;
  let fixture: ComponentFixture<TabsOnlineAstrologersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsOnlineAstrologersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsOnlineAstrologersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
