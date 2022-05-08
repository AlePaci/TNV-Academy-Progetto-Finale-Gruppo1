import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastDetailComponent } from './cast-detail.component';

describe('CastDetailComponent', () => {
  let component: CastDetailComponent;
  let fixture: ComponentFixture<CastDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
