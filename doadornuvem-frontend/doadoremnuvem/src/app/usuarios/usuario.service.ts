import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../login/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<Array<Usuario>> {
    const url = environment.apiUrl + environment.post_usuarios_salvar;
    return this.http.get<Array<Usuario>>(url);
  }

  salvarUsuario(usuario: Usuario) {
    const url = environment.apiUrl + environment.post_usuarios_salvar;
    return this.http.post(url, JSON.stringify(usuario));
  }
}
