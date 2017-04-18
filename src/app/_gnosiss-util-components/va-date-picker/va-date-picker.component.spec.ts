import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaDatePickerComponent } from './va-date-picker.component';

describe('VaDatePickerComponent', () => {
  let component: VaDatePickerComponent;
  let fixture: ComponentFixture<VaDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
