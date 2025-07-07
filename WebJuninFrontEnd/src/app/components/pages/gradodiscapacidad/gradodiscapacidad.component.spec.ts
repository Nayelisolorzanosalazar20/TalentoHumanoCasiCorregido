import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradodiscapacidadComponent } from './gradodiscapacidad.component';

describe('GradodiscapacidadComponent', () => {
  let component: GradodiscapacidadComponent;
  let fixture: ComponentFixture<GradodiscapacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradodiscapacidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradodiscapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
