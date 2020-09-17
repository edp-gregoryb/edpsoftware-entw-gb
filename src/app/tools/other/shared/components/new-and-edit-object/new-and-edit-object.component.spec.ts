import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAndEditObjectComponent } from './new-and-edit-object.component';

describe('NewAndEditObjectComponent', () => {
  let component: NewAndEditObjectComponent;
  let fixture: ComponentFixture<NewAndEditObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAndEditObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAndEditObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
