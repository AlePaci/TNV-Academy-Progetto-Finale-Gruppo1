import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessFormComponent } from './guess-form.component';

describe('GuessFormComponent', () => {
  let component: GuessFormComponent;
  let fixture: ComponentFixture<GuessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
