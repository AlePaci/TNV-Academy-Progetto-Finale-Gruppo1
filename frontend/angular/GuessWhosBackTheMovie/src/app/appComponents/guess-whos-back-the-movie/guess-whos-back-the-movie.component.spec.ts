import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessWhosBackTheMovieComponent } from './guess-whos-back-the-movie.component';

describe('GuessWhosBackTheMovieComponent', () => {
  let component: GuessWhosBackTheMovieComponent;
  let fixture: ComponentFixture<GuessWhosBackTheMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessWhosBackTheMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessWhosBackTheMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
