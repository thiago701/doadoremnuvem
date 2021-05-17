import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../login/usuario';
import {Doador} from '../Doador';
import {DoadorService} from '../doador.service';

@Component({
  selector: 'app-listar-doadores',
  templateUrl: './listar-doadores.component.html',
  styleUrls: ['./listar-doadores.component.css']
})
export class ListarDoadoresComponent implements OnInit {

  public doadores: Array<Doador> = [];
  permNotiOpcoes: any[];

  constructor(private doadorService: DoadorService) {
    this.permNotiOpcoes = [{label: 'Não', value: false}, {label: 'Sim', value: true}];
  }

  ngOnInit(): void {
    // Seta uma classe no BODY para controle de interface
    const body = document.getElementsByTagName('body')[0];
    body.className = '';
    body.classList.add('page-doadores'); // page.sass + style.css
    this.listar();
  }

  listar() {
    this.doadorService.listarDoadores().subscribe(data => {
      this.doadores = data;
    },
      (err) => {
        console.log(err);
      });
  }

  public atualizarPermissaoNotificacao(registro, event: any) {
    this.doadorService.atualizarPermissaoNotificacao(registro, event.value).subscribe(data => {
      // atualiza permissao
    },
      (err) => {
        console.log(err);
      });
  }

}