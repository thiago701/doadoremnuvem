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
    const url = environment.apiUrl + environment.get_doador_tipo + grupoAbo + '/' + fatorRH;
    return this.http.get<any>(url);
  }

  listarDoadoresPorLocalidade(cidade: string, bairro: string):Observable<Array<Doador>>{
    const url = environment.apiUrl+ environment.get_doador_localidade+cidade + '/'+ bairro;
    return this.http.get<any>(url);
  }

  listarBairroPorCidade(cidade:string):Observable<Array<Doador>>{
    const url = environment.apiUrl + environment.get_bairro_cidade + cidade;
    return this.http.get<any>(url);
  }

  notificarDoadorPorCodigo(registros: Array<string>, tipo_msg: string){
    const url = environment.apiUrl + environment.get_notificacao_por_codigo + registros + '/' + tipo_msg;
    return this.http.get<any>(url);
  }
}
