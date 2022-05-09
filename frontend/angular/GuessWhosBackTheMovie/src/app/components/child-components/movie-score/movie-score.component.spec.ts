import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieScoreComponent } from './movie-score.component';

describe('MovieScoreComponent', () => {
  let component: MovieScoreComponent;
  let fixture: ComponentFixture<MovieScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
