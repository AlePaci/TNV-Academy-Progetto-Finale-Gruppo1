import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingFormComponent } from './saving-form.component';

describe('SavingFormComponent', () => {
  let component: SavingFormComponent;
  let fixture: ComponentFixture<SavingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
