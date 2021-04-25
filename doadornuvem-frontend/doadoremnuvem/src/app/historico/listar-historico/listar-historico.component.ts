import { Component, OnInit } from '@angular/core';
import {Historico} from "../historico";
import {HistoricoService} from "../service/historico.service";

@Component({
  selector: 'app-listar-historico',
  templateUrl: './listar-historico.component.html',
  styleUrls: ['./listar-historico.component.css']
})
export class ListarHistoricoComponent implements OnInit {

  historico: Array<Historico> = [];

  constructor(private historicoService: HistoricoService) { }

  ngOnInit(): void {
    // Seta uma classe no BODY para controle de interface
    const body = document.getElementsByTagName('body')[0];
    body.className = '';
    body.classList.add('page-historico'); // page.sass + style.css
    this.listar();
  }

  reprocessarFalha(historico: any) {
    // TODO
  }

  listar() {
    this.historicoService.listarHistorico().subscribe(data => {
      this.historico = data;
    });
  }
}
