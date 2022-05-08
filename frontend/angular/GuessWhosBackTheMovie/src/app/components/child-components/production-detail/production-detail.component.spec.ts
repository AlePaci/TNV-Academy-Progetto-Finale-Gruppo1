import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDetailComponent } from './production-detail.component';

describe('ProductionDetailComponent', () => {
  let component: ProductionDetailComponent;
  let fixture: ComponentFixture<ProductionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
