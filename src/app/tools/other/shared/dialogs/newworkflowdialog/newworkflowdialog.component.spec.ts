import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewworkflowdialogComponent } from './newworkflowdialog.component';

describe('NewworkflowdialogComponent', () => {
  let component: NewworkflowdialogComponent;
  let fixture: ComponentFixture<NewworkflowdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewworkflowdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewworkflowdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
