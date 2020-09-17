import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllgemeineinfosComponent } from './allgemeineinfos.component';

describe('AllgemeineinfosComponent', () => {
  let component: AllgemeineinfosComponent;
  let fixture: ComponentFixture<AllgemeineinfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllgemeineinfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllgemeineinfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
