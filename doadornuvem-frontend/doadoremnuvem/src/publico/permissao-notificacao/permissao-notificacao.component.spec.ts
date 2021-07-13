import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissaoNotificacaoComponent } from './permissao-notificacao.component';

describe('PermissaoNotificacaoComponent', () => {
  let component: PermissaoNotificacaoComponent;
  let fixture: ComponentFixture<PermissaoNotificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissaoNotificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissaoNotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
