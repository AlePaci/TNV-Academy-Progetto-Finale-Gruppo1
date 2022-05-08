import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinossiComponent } from './sinossi.component';

describe('SinossiComponent', () => {
  let component: SinossiComponent;
  let fixture: ComponentFixture<SinossiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinossiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinossiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
