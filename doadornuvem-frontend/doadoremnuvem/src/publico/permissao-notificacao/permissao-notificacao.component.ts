import { Component, OnInit } from '@angular/core';
import {DoadorService} from '../../app/doadores/doador.service'; 
import {ActivatedRoute} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-permissao-notificacao',
  templateUrl: './permissao-notificacao.component.html',
  styleUrls: ['./permissao-notificacao.component.css']
})
export class PermissaoNotificacaoComponent implements OnInit {

  constructor(private doadorService: DoadorService, 
    private messageService : MessageService,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

  }

  cancelarNotificao(Registro : string){
    let registroDoador = atob(Registro);  
    this.doadorService.atualizarPermissaoNotificacao(registroDoador, false).subscribe(
      data => {
        this.messageService.add({severity:'success', summary:'Operação realizada', detail:'Usuário atualizado com sucesso!'})
     },
    (err) => {
      this.messageService.add({severity:'error', summary:'Operação não realizada', detail: 'Falha: ' + err})    
      console.log(err);
    });
    
  }
  fecharBrowser(){
    window.close;
  }

}
