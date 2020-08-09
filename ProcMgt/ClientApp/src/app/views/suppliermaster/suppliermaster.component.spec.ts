import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliermasterComponent } from './suppliermaster.component';

describe('SuppliermasterComponent', () => {
  let component: SuppliermasterComponent;
  let fixture: ComponentFixture<SuppliermasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliermasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
