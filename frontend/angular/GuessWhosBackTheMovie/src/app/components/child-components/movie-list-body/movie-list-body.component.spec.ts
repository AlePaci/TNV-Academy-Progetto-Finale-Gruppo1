import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListBodyComponent } from './movie-list-body.component';

describe('MovieListBodyComponent', () => {
  let component: MovieListBodyComponent;
  let fixture: ComponentFixture<MovieListBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieListBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
