import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjausgabesucheComponent } from './objausgabesuche.component';

describe('ObjausgabesucheComponent', () => {
  let component: ObjausgabesucheComponent;
  let fixture: ComponentFixture<ObjausgabesucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjausgabesucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjausgabesucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
