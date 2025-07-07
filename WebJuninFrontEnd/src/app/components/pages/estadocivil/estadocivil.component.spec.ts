import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadocivilComponent } from './estadocivil.component';

describe('EstadocivilComponent', () => {
  let component: EstadocivilComponent;
  let fixture: ComponentFixture<EstadocivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadocivilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadocivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
