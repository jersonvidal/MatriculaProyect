import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariogrupoComponent } from './horariogrupo.component';

describe('HorariogrupoComponent', () => {
  let component: HorariogrupoComponent;
  let fixture: ComponentFixture<HorariogrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariogrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorariogrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
