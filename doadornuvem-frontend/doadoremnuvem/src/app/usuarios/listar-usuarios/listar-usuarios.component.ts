import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/login/usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  public usuarios: Array<Usuario> = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (err) => {
        console.log(err);
      }
    );
    // Seta uma classe no BODY para controle de interface
    const body = document.getElementsByTagName('body')[0];
    body.className = '';
    body.classList.add('page-usuarios'); // page.sass + style.css
  }

  excluirUsuario(usuario: Usuario) {
    // TODO
  }


}
