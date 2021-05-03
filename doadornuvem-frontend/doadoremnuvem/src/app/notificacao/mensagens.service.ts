import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Mensagem} from "./mensagens/Mensagem";

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  constructor(private http: HttpClient) { }

  listarMensagens(): Observable<Array<Mensagem>> {
    const url = environment.apiUrl + environment.get_mensagem_listar;
    return this.http.get<Array<Mensagem>>(url);
  }

  atualizarMensagemNotificacao(msggeral: string, msgtipo: string, msglocalidade: string) {
    const url = environment.apiUrl + environment.get_atualizar_mensagem + msggeral + '/' + msgtipo + '/' + msglocalidade;
    console.log(url);
    return this.http.get<any>(url);
  }
}
