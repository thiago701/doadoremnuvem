import { Component } from '@angular/core';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css'],
  providers: [ MessageService ]
})
export class ErrorMsgComponent {

  constructor(private messageService: MessageService) { }

  public setError(error: string) {
    console.log('setError: ', error);
    this.messageService.add({severity:'error', summary: 'Mensagem de erro', detail:error});
  }
}
