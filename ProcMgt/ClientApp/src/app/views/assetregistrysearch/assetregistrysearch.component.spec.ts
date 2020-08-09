import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetregistrysearchComponent } from './assetregistrysearch.component';

describe('AssetregistrysearchComponent', () => {
  let component: AssetregistrysearchComponent;
  let fixture: ComponentFixture<AssetregistrysearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetregistrysearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetregistrysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
