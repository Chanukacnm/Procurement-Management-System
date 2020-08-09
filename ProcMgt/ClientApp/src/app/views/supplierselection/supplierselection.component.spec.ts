import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierselectionComponent } from './supplierselection.component';

describe('SupplierselectionComponent', () => {
  let component: SupplierselectionComponent;
  let fixture: ComponentFixture<SupplierselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
