import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodendialogComponent } from './codendialog.component';

describe('CodendialogComponent', () => {
  let component: CodendialogComponent;
  let fixture: ComponentFixture<CodendialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodendialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodendialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
