import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardworkflowdialogComponent } from './discardworkflowdialog.component';

describe('DiscardworkflowdialogComponent', () => {
  let component: DiscardworkflowdialogComponent;
  let fixture: ComponentFixture<DiscardworkflowdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscardworkflowdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardworkflowdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
