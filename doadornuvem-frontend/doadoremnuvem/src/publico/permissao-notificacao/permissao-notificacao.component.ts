import { Component, OnInit } from '@angular/core';
import {DoadorService} from '../../app/doadores/doador.service'; 
import {ActivatedRoute} from '@angular/router' ;

@Component({
  selector: 'app-permissao-notificacao',
  templateUrl: './permissao-notificacao.component.html',
  styleUrls: ['./permissao-notificacao.component.css']
})
export class PermissaoNotificacaoComponent implements OnInit {

  constructor(private doadorService: DoadorService, 
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

  }

  cancelarNotificao(){
    let registro = btoa(this.activatedRoute.snapshot.params.id);
    console.log("encode: "+registro);
    //atob(this.activatedRoute.snapshot.params.id);
    
    console.log("decode" + atob(registro));
    
    // this.doadorService.atualizarPermissaoNotificacao(registro, false).subscribe(data => {
    // },
    // (err) => {
    //   console.log(err);
    // });
    
  }

}
