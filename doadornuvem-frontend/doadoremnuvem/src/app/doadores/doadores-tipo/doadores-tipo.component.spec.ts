import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoadoresTipoComponent } from './doadores-tipo.component';

describe('DoadoresTipoComponent', () => {
  let component: DoadoresTipoComponent;
  let fixture: ComponentFixture<DoadoresTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoadoresTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoadoresTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
