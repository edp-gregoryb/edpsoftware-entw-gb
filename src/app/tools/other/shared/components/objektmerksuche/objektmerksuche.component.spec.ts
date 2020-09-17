import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjektmerksucheComponent } from './objektmerksuche.component';

describe('ObjektmerksucheComponent', () => {
  let component: ObjektmerksucheComponent;
  let fixture: ComponentFixture<ObjektmerksucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjektmerksucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjektmerksucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
