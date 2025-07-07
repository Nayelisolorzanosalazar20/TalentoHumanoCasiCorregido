import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaFamiliarComponent } from './cargafamiliar.component';

describe('CargaFamiliarComponent', () => {
  let component: CargaFamiliarComponent;
  let fixture: ComponentFixture<CargaFamiliarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaFamiliarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargaFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
