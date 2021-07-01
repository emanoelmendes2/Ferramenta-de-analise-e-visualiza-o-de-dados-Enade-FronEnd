import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelEnvioComponent } from './painel-envio.component';

describe('PainelEnvioComponent', () => {
  let component: PainelEnvioComponent;
  let fixture: ComponentFixture<PainelEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
