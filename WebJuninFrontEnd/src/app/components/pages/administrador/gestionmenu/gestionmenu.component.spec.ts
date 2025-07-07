import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionmenuComponent } from './gestionmenu.component';

describe('GestionmenuComponent', () => {
  let component: GestionmenuComponent;
  let fixture: ComponentFixture<GestionmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
