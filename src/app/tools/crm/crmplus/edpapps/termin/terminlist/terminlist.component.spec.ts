import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminlistComponent } from './terminlist.component';

describe('TerminlistComponent', () => {
  let component: TerminlistComponent;
  let fixture: ComponentFixture<TerminlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
