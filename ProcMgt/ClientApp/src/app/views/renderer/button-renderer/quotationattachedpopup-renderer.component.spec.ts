import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationattachedpopupRenderer } from './quotationattachedpopup-renderer.component';

describe('QuotationattachedpopupComponent', () => {
  let component: QuotationattachedpopupRenderer;
  let fixture: ComponentFixture<QuotationattachedpopupRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuotationattachedpopupRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationattachedpopupRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
