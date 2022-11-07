import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesBlogComponent } from './articles-blog.component';

describe('ArticlesBlogComponent', () => {
  let component: ArticlesBlogComponent;
  let fixture: ComponentFixture<ArticlesBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
