import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsAndCommentsComponent } from './docs-and-comments.component';

describe('DocsAndCommentsComponent', () => {
  let component: DocsAndCommentsComponent;
  let fixture: ComponentFixture<DocsAndCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsAndCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsAndCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
