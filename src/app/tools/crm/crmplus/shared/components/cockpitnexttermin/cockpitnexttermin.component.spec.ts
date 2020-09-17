import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CockpitnextterminComponent } from './cockpitnexttermin.component';

describe('CockpitnextterminComponent', () => {
  let component: CockpitnextterminComponent;
  let fixture: ComponentFixture<CockpitnextterminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CockpitnextterminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CockpitnextterminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
