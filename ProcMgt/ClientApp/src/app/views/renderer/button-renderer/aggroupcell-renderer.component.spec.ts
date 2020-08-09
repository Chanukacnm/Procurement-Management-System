import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggroupcellRenderer } from './aggroupcell-renderer.component';

describe('AggroupcellRenderer', () => {
  let component: AggroupcellRenderer;
  let fixture: ComponentFixture<AggroupcellRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AggroupcellRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggroupcellRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
