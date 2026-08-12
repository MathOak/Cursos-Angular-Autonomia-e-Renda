import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Produto } from './produto';

describe('Produto', () => {
  let component: Produto;
  let fixture: ComponentFixture<Produto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Produto],
    }).compileComponents();

    fixture = TestBed.createComponent(Produto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
