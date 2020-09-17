import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletearticledialogComponent } from './deletearticledialog.component';

describe('DeletearticledialogComponent', () => {
  let component: DeletearticledialogComponent;
  let fixture: ComponentFixture<DeletearticledialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletearticledialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletearticledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
