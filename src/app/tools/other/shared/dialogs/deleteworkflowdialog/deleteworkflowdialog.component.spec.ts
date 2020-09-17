import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteworkflowdialogComponent } from './deleteworkflowdialog.component';

describe('DeleteworkflowdialogComponent', () => {
  let component: DeleteworkflowdialogComponent;
  let fixture: ComponentFixture<DeleteworkflowdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteworkflowdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteworkflowdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
