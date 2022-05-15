import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessDataComponent } from './guess-data.component';

describe('GuessDataComponent', () => {
  let component: GuessDataComponent;
  let fixture: ComponentFixture<GuessDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
