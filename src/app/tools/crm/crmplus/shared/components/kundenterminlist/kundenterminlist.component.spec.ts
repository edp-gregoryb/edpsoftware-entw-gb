import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenterminlistComponent } from './kundenterminlist.component';

describe('KundenterminlistComponent', () => {
  let component: KundenterminlistComponent;
  let fixture: ComponentFixture<KundenterminlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundenterminlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundenterminlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
