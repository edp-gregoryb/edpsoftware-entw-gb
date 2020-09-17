import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpanelnewComponent } from './mainpanelnew.component';

describe('MainpanelnewComponent', () => {
  let component: MainpanelnewComponent;
  let fixture: ComponentFixture<MainpanelnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainpanelnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpanelnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
