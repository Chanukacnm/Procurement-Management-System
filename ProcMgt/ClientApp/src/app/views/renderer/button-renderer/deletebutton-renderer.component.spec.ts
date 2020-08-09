import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteButtonRenderer } from './deletebutton-renderer.component';

describe('DeletebuttonRendererComponent', () => {
  let component: DeleteButtonRenderer;
  let fixture: ComponentFixture<DeleteButtonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteButtonRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteButtonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
