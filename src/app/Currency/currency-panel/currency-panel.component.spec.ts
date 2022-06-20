import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyPanelComponent } from './currency-panel.component';

describe('CurrencyPanelComponent', () => {
  let component: CurrencyPanelComponent;
  let fixture: ComponentFixture<CurrencyPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
