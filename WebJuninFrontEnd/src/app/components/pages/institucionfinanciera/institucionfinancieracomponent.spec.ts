import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionFinancieraComponent } from './institucionfinanciera.component';
describe('InstitucionFinancieraComponent', () => {
  let component: InstitucionFinancieraComponent;
  let fixture: ComponentFixture<InstitucionFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitucionFinancieraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitucionFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
