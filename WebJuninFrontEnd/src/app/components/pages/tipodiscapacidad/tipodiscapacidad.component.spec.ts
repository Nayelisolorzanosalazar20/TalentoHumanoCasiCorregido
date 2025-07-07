import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipodiscapacidadComponent } from './tipodiscapacidad.component';

describe('TipodiscapacidadComponent', () => {
  let component: TipodiscapacidadComponent;
  let fixture: ComponentFixture<TipodiscapacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipodiscapacidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipodiscapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
