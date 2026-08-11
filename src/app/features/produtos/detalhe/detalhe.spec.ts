import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detalhe } from './detalhe';

describe('Detalhe', () => {
  let component: Detalhe;
  let fixture: ComponentFixture<Detalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Detalhe],
    }).compileComponents();

    fixture = TestBed.createComponent(Detalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
