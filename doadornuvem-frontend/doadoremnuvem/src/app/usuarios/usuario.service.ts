import {HttpClient, HttpParams} from '@angular/common/http';
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
    const url = environment.apiUrl + environment.get_usuarios_listar;
    return this.http.get<Array<Usuario>>(url);
  }

  salvarUsuario(usuario: Usuario) {
    const options = { params: new HttpParams()
        .set('nome', usuario.nome)
        .set('perfil', usuario.perfil)
        .set('cpf', usuario.cpf)
        .set('email', usuario.email)
        .set('endereco', usuario.endereco)
        .set('telefone', usuario.telefone)
        .set('senha', usuario.senha)
    };
    const url = environment.apiUrl + environment.post_usuarios_salvar;
    return this.http.get(url, options);
  }

  editarUsuario(usuario: Usuario) {
    const options = { params: new HttpParams()
        .set('nome', usuario.nome)
        .set('perfil', usuario.perfil)
        .set('cpf', usuario.cpf)
        .set('email', usuario.email)
        .set('endereco', usuario.endereco)
        .set('telefone', usuario.telefone)
        .set('senha', usuario.senha)
    };
    const url = environment.apiUrl + environment.post_usuarios_editar;
    return this.http.get(url, options);
  }

  excluirUsuario(usuario: Usuario) {
    const options = { params: new HttpParams().set('cpf', usuario.cpf) };
    const url = environment.apiUrl + environment.post_usuarios_excluir;
    return this.http.get(url, options);
  }
}
