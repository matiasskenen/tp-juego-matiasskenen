import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntuajeComponent } from './puntuaje.component';

describe('PuntuajeComponent', () => {
  let component: PuntuajeComponent;
  let fixture: ComponentFixture<PuntuajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntuajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntuajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
