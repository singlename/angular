import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFullPageComponent } from './article-full-page.component';

describe('ArticleFullPageComponent', () => {
  let component: ArticleFullPageComponent;
  let fixture: ComponentFixture<ArticleFullPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleFullPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFullPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
