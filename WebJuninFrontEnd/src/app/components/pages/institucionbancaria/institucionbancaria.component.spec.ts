import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionBancariaComponent } from './institucionbancaria.component';

describe('CargaFamiliarCaomponent', () => {
  let component: InstitucionBancariaComponent;
  let fixture: ComponentFixture<InstitucionBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitucionBancariaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitucionBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
