import { Component, OnInit, ViewChild } from '@angular/core';
import {Doador} from '../Doador';
import {DoadorService} from '../doador.service';
import { Table } from 'primeng/table';
import {MessageService} from "primeng/api";

interface TipoSague{
  nome: string,
  abo : string,
  fator :string
}

@Component({
  selector: 'app-doadores-tipo',
  templateUrl: './doadores-tipo.component.html',
  styleUrls: ['./doadores-tipo.component.css']
})

export class DoadoresTipoComponent implements OnInit{
  tiposSaguineos : TipoSague[];
  selectedTipo : TipoSague;
  grupoAbo :string;
  fator : string;
  pesquisaZerada : boolean;
  public doadores: Array<Doador> = [];
  permNotiOpcoes: any[];
  registrosDoadores : Array<string> = [];

  constructor(
    private messageService: MessageService,
    private doadorService: DoadorService) {
      this.pesquisaZerada = false;
      this.permNotiOpcoes = [{label: 'Não', value: false}, {label: 'Sim', value: true}];
      this.tiposSaguineos =[
      {nome:'A+', abo:'A',fator:'P'},
      {nome:'A-', abo:'A',fator:'N'},
      {nome:'B+', abo:'B',fator:'P'},
      {nome:'B-', abo:'B',fator:'N'},
      {nome:'AB+', abo:'AB',fator:'P'},
      {nome:'AB-', abo:'AB',fator:'N'},
      {nome:'O+', abo:'O',fator:'P'},
      {nome:'O-', abo:'O',fator:'N'},
    ]
  }

  ngOnInit(): void {
  }

  listarDoaresTipo(){

    if (this.selectedTipo != null){

    this.grupoAbo = this.selectedTipo.abo;
    this.fator = this.selectedTipo.fator;
    this.doadorService.listarDoadoresPorTipo(this.grupoAbo, this.fator).subscribe(data =>{
      this.doadores = data;
      if (this.doadores.length == 0)
        this.pesquisaZerada = true;
      else{
        this.pesquisaZerada = false;
       // console.log(this.doadores[0].registro);
      }

    },
    (err) => {
      console.log(err);
    });
  }
}

enviarNotificacao() {

  this.registrosDoadores = [];
  if (this.doadores.length > 0){
    for (let i: number = 0; i < this.doadores.length; i++){
      this.registrosDoadores.push(this.doadores[i].registro.toString());
    }
  }
  this.doadorService.notificarDoadorPorCodigo(this.registrosDoadores, 'tipo').subscribe(data => data);
  this.messageService.add({severity:'success', summary:'Operação realizada', detail:'Notificação em andamento...'});
}

}
