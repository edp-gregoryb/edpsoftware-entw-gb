import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsearchpanelComponent } from './testsearchpanel.component';

describe('TestsearchpanelComponent', () => {
  let component: TestsearchpanelComponent;
  let fixture: ComponentFixture<TestsearchpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsearchpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsearchpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
