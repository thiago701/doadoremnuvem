import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoadoresLocalidadeComponent } from './doadores-localidade.component';

describe('DoadoresLocalidadeComponent', () => {
  let component: DoadoresLocalidadeComponent;
  let fixture: ComponentFixture<DoadoresLocalidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoadoresLocalidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoadoresLocalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
