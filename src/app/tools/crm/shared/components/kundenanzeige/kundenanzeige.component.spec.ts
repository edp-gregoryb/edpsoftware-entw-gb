import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenanzeigeComponent } from './kundenanzeige.component';

describe('KundenanzeigeComponent', () => {
  let component: KundenanzeigeComponent;
  let fixture: ComponentFixture<KundenanzeigeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundenanzeigeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundenanzeigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
