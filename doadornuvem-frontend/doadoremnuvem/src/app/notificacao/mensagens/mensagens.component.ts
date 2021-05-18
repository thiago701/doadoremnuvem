import {Component, Input, OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';
import {MensagensService} from '../mensagens.service';
import {Mensagem} from './Mensagem';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {

  @Input()
  mensagem: Mensagem;

  constructor(private mensagensService: MensagensService,
    private confirmacaoService : MessageService) { }

  ngOnInit(): void {
    // Seta uma classe no BODY para controle de interface
    const body = document.getElementsByTagName('body')[0];
    body.className = '';
    body.classList.add('page-mensagens'); // page.sass + style.css
    this.carregar();

  }

  carregar() {
    this.mensagensService.listarMensagens().subscribe(data => {
      this.mensagem = data[0];
    });
  }

  atualizar() {
    this.mensagensService.atualizarMensagemNotificacao(this.mensagem.msg_notifica_geral,
      this.mensagem.msg_notifica_por_tipo,
      this.mensagem.msg_notifica_por_localidade)
      .subscribe(
        (data) => {
          this.confirmacaoService.add({severity:'success', summary:'Operação realizada', detail:'Mensagem de notificação atualizada com sucesso!'})
        }),
        (err) => {
          this.confirmacaoService.add({severity:'Error', summary:'Operação não realizada', detail:'Falha ao atualizar a mensagem de notificação:' + err})
        }
        ;
  }

}
