import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallematriculaComponent } from './detallematricula.component';

describe('DetallematriculaComponent', () => {
  let component: DetallematriculaComponent;
  let fixture: ComponentFixture<DetallematriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallematriculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallematriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
