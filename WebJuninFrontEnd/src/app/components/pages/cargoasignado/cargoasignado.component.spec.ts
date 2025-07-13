import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoAsignadoComponent } from './cargoasignado.component';

describe('CargoAsignadoComponent', () => {
  let component: CargoAsignadoComponent;
  let fixture: ComponentFixture<CargoAsignadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargoAsignadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargoAsignadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
