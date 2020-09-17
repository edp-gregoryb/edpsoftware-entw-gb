import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftragdetailComponent } from './auftragdetail.component';

describe('AuftragdetailComponent', () => {
  let component: AuftragdetailComponent;
  let fixture: ComponentFixture<AuftragdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuftragdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuftragdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
