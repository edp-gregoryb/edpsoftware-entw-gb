import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestmainpanelComponent } from './testmainpanel.component';

describe('TestmainpanelComponent', () => {
  let component: TestmainpanelComponent;
  let fixture: ComponentFixture<TestmainpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestmainpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestmainpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
