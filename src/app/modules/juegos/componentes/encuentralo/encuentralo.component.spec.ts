import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentraloComponent } from './encuentralo.component';

describe('EncuentraloComponent', () => {
  let component: EncuentraloComponent;
  let fixture: ComponentFixture<EncuentraloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuentraloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuentraloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
