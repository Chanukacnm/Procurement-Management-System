import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationenterviewComponent } from './quotationenterview.component';

describe('QuotationenterviewComponent', () => {
  let component: QuotationenterviewComponent;
  let fixture: ComponentFixture<QuotationenterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationenterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationenterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
