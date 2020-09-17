import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodensucheComponent } from './codensuche.component';

describe('CodensucheComponent', () => {
  let component: CodensucheComponent;
  let fixture: ComponentFixture<CodensucheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodensucheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodensucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
