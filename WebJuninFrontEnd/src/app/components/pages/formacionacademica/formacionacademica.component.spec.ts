import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacionComponent } from './formacionacademica.component';
describe('FormacionComponent', () => {
  let component: FormacionComponent;
  let fixture: ComponentFixture<FormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


