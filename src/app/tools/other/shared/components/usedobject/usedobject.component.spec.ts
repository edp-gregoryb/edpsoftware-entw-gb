import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedobjectComponent } from './usedobject.component';

describe('UsedobjectComponent', () => {
  let component: UsedobjectComponent;
  let fixture: ComponentFixture<UsedobjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedobjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
