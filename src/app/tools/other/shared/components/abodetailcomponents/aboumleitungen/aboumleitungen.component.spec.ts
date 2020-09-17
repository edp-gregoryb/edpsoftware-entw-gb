import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboumleitungenComponent } from './aboumleitungen.component';

describe('AboumleitungenComponent', () => {
  let component: AboumleitungenComponent;
  let fixture: ComponentFixture<AboumleitungenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboumleitungenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboumleitungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
