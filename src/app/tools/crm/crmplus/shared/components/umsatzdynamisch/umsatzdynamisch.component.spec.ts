import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmsatzdynamischComponent } from './umsatzdynamisch.component';

describe('UmsatzdynamischComponent', () => {
  let component: UmsatzdynamischComponent;
  let fixture: ComponentFixture<UmsatzdynamischComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmsatzdynamischComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmsatzdynamischComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
