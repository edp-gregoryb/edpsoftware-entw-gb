import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpanelheadComponent } from './mainpanelhead.component';

describe('MainpanelheadComponent', () => {
  let component: MainpanelheadComponent;
  let fixture: ComponentFixture<MainpanelheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainpanelheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpanelheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
