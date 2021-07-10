import { Component, OnInit } from '@angular/core';
import {Doador} from '../Doador';
import {DoadorService} from '../doador.service';

interface Cidade{
  nome: string,
  nomeBD:string
}

interface Bairro{
  nome: string
}


@Component({
  selector: 'app-doadores-localidade',
  templateUrl: './doadores-localidade.component.html',
  styleUrls: ['./doadores-localidade.component.css']
})
export class DoadoresLocalidadeComponent implements OnInit {
  cidades : Cidade[];
  bairros : Bairro[];
  selectedCidade : Cidade;
  selectedBairro : Bairro;
  pesquisaZerada : boolean;
  permNotiOpcoes: any[];
  public doadores: Array<Doador> = [];

  constructor(private doadorService: DoadorService) {
    this.pesquisaZerada = false;
    this.permNotiOpcoes = [{label: 'Não', value: false}, {label: 'Sim', value: true}];
    this.cidades =[
      {nome:'Cajazeiras', nomeBD:'CAJAZEIRAS'},
      {nome:'Campina Grande', nomeBD:'CAMPINA GRANDE'},
      {nome:'Catolé do Rocha', nomeBD:'CATOLE DO ROCHA'},
      {nome:'Guarabira', nomeBD:'GUARABIRA'},
      {nome:'Itaporanga', nomeBD:'ITAPORANGA'},
      {nome:'João Pessoa', nomeBD:'JOAO PESSOA'},
      {nome:'Monteiro', nomeBD:'MONTEIRO'},
      {nome:'Patos',nomeBD:'PATOS'},
      {nome:'Piancó', nomeBD:'PIANCO'},
      {nome:'Picuí',nomeBD:'PICUI'},
      {nome:'Princesa Isabel', nomeBD:'PRINCESA ISABEL'},
      {nome:'Sousa', nomeBD:'SOUSA'},
  ]

  this.bairros=[];
}

  ngOnInit(): void {
  }

  listarDoaresLocalidade(){
    if (this.selectedCidade != null && this.selectedBairro != null){

    }
  }

  listarBairrosByCidade(){
    if (this.selectedCidade != null){

    }
    console.log(this.selectedCidade.nomeBD);
  }

  enviarNotificacao(){
    // TODO
  }
}
