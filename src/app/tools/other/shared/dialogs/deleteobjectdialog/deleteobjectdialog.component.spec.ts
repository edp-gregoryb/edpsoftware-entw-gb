import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteobjectdialogComponent } from './deleteobjectdialog.component';

describe('DeleteobjectdialogComponent', () => {
  let component: DeleteobjectdialogComponent;
  let fixture: ComponentFixture<DeleteobjectdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteobjectdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteobjectdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
