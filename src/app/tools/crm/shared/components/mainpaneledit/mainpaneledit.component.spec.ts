import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpaneleditComponent } from './mainpaneledit.component';

describe('MainpaneleditComponent', () => {
  let component: MainpaneleditComponent;
  let fixture: ComponentFixture<MainpaneleditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainpaneleditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpaneleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
