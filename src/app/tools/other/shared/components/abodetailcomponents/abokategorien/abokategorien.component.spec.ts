import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbokategorienComponent } from './abokategorien.component';

describe('AbokategorienComponent', () => {
  let component: AbokategorienComponent;
  let fixture: ComponentFixture<AbokategorienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbokategorienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbokategorienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
