import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubrikComponent } from './rubrik.component';

describe('RubrikComponent', () => {
  let component: RubrikComponent;
  let fixture: ComponentFixture<RubrikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubrikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubrikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
