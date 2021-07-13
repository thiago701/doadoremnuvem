import { Component, OnInit } from '@angular/core';
import {Doador} from '../Doador';
import {DoadorService} from '../doador.service';

interface Cidade{
  nome: string,
  nomeBD:string
}

interface Bairro{
  bairro: string
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
  public bairrosDoadores:Array<Bairro> = [];
  nomeCidade : string;
  nomeBairro : string;
  registrosDoadores : Array<string> = [];

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
      this.nomeCidade = this.selectedCidade.nomeBD;
      this.nomeBairro = this.selectedBairro.bairro;
      this.doadorService.listarDoadoresPorLocalidade(this.nomeCidade, this.nomeBairro).subscribe(data =>{
        this.doadores = data;
        if (this.bairrosDoadores.length == 0)
          this.pesquisaZerada = true;
        else
          this.pesquisaZerada = false;
      },
      (err) => {
        console.log(err);
    });
  }
}

  listarBairrosByCidade(){
    if (this.selectedCidade != null){
      
    this.nomeCidade = this.selectedCidade.nomeBD;
    this.doadorService.listarBairroPorCidade(this.nomeCidade).subscribe(data =>{
      this.bairrosDoadores = data;
    },
    (err) => {
      console.log(err);
    });    
    }
  }

  enviarNotificacao(){
    if (this.doadores.length > 0){
      for (let i: number = 0; i < this.doadores.length; i++){
        this.registrosDoadores.push(this.doadores[i].registro.toString());
      }
    }
    //console.log(this.registrosDoadores.toString())
    this.doadorService.notificarDoadorPorCodigo(this.registrosDoadores);
  }
}
