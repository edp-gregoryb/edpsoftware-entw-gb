import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftraglistComponent } from './auftraglist.component';

describe('AuftraglistComponent', () => {
  let component: AuftraglistComponent;
  let fixture: ComponentFixture<AuftraglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuftraglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuftraglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
