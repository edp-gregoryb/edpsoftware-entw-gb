import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAndEditArticleComponent } from './new-and-edit-article.component';

describe('NewAndEditArticleComponent', () => {
  let component: NewAndEditArticleComponent;
  let fixture: ComponentFixture<NewAndEditArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAndEditArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAndEditArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
