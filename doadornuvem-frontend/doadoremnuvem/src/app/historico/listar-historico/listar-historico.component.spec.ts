import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHistoricoComponent } from './listar-historico.component';

describe('ListarHistoricoComponent', () => {
  let component: ListarHistoricoComponent;
  let fixture: ComponentFixture<ListarHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
