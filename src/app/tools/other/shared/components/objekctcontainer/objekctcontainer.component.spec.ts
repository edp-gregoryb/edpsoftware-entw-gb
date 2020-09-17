import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjekctcontainerComponent } from './objekctcontainer.component';

describe('ObjekctcontainerComponent', () => {
  let component: ObjekctcontainerComponent;
  let fixture: ComponentFixture<ObjekctcontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjekctcontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjekctcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
