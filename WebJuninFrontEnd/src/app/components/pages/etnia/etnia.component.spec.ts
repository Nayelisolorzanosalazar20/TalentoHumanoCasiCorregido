import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtniaComponent } from './etnia.component';

describe('EtniaComponent', () => {
  let component: EtniaComponent;
  let fixture: ComponentFixture<EtniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtniaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
