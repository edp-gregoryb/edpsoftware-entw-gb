import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerksucheComponent } from './merksuche.component';

describe('MerksucheComponent', () => {
  let component: MerksucheComponent;
  let fixture: ComponentFixture<MerksucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerksucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerksucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
