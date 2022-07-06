import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBlogPageComponent } from './single-blog-page.component';

describe('SingleBlogPageComponent', () => {
  let component: SingleBlogPageComponent;
  let fixture: ComponentFixture<SingleBlogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBlogPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
