import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupocursoComponent } from './grupocurso.component';

describe('GrupocursoComponent', () => {
  let component: GrupocursoComponent;
  let fixture: ComponentFixture<GrupocursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupocursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupocursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
