import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { data } from 'jquery';
import { Usuario } from '../login/usuario';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public tipoCadastro: any;
  public usuarios: Array<Usuario>;

  constructor(
    private usuarioService: UsuarioService,
  
    ) { }

  ngOnInit(): void {
    // Seta uma classe no BODY para controle de interface
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('page-usuarios');

  }
  onSubmit() {
    console.log(this.usuario);
    this.usuarioService.salvarUsuario(this.usuario).subscribe(
      (data) => {
      },
      (err) => {
        console.log(err);
      }   
    );
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.listarUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
