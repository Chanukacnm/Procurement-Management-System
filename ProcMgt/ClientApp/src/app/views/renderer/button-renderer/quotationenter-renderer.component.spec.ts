import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationenterRendererComponent } from './quotationenter-renderer.component';

describe('QuotationenterRendererComponent', () => {
  let component: QuotationenterRendererComponent;
  let fixture: ComponentFixture<QuotationenterRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationenterRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationenterRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
