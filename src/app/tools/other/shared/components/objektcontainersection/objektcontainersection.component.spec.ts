import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjektcontainersectionComponent } from './objektcontainersection.component';

describe('ObjektcontainersectionComponent', () => {
  let component: ObjektcontainersectionComponent;
  let fixture: ComponentFixture<ObjektcontainersectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjektcontainersectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjektcontainersectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
