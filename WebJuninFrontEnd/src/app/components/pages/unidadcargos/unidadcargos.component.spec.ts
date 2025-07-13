import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadCargosComponent } from './unidadcargos.component';

describe('UnidadCargosComponent', () => {
  let component: UnidadCargosComponent;
  let fixture: ComponentFixture<UnidadCargosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadCargosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
