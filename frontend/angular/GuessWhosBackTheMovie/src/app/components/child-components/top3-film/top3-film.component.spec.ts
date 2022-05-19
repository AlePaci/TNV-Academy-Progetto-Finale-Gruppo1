import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top3FilmComponent } from './top3-film.component';

describe('Top3FilmComponent', () => {
  let component: Top3FilmComponent;
  let fixture: ComponentFixture<Top3FilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Top3FilmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Top3FilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
