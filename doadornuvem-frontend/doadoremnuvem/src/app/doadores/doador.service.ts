import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Doador} from "./Doador";

@Injectable({
  providedIn: 'root'
})
export class DoadorService {

  constructor(private http: HttpClient) { }

  listarDoadores(): Observable<Array<Doador>> {
    const url = environment.apiUrl + environment.get_doador_listar;
    return this.http.get<Array<Doador>>(url);
    console.log('Retorno da api');
  }

  atualizarPermissaoNotificacao(registro: string, valor: boolean) {
    const url = environment.apiUrl + environment.get_permissao_notificao + registro + '/' + valor;
    console.log(url);
    return this.http.get<any>(url);
  }

  listarDoadoresPorTipo(grupoAbo : string, fatorRH : string): Observable<Array<Doador>>{
    const url = environment.apiUrl + environment.get_doador_tipo+ grupoAbo + '/' + fatorRH;
    return this.http.get<any>(url);
  }
}
