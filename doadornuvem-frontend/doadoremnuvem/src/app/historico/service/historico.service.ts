import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Historico} from "../historico";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {


  constructor(private http: HttpClient) { }

  listarHistorico(): Observable<Historico[]> {
    const url = environment.apiUrl + environment.get_historico_listar;
    return this.http.get<Historico[]>(url);
  }
}
