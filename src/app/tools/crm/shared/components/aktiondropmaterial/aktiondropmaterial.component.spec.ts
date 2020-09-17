import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AktiondropmaterialComponent } from './aktiondropmaterial.component';

describe('AktiondropmaterialComponent', () => {
  let component: AktiondropmaterialComponent;
  let fixture: ComponentFixture<AktiondropmaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktiondropmaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktiondropmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
