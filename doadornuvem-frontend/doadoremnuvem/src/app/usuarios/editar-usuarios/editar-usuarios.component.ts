import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../login/usuario';
import {UsuarioService} from '../usuario.service';
import {ActivatedRoute} from '@angular/router' ;
import {MessageService, ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  public usuarios: Array<Usuario>;

  constructor(
    public usuarioService : UsuarioService,
    private activatedRoute : ActivatedRoute,
    private confimationService : ConfirmationService,
    private messageService : MessageService
    ) {
      this.preparaEditarUsuario(this.activatedRoute.snapshot.params.id);
     }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('page-usuarios');
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

  editarUsuario(usuario: Usuario) {
    this.usuarioService.editarUsuario(usuario).subscribe(
      (data) => {
        this.messageService.add({severity:'success', summary:'Operação realizada', detail:'Usuário atualizado com sucesso!'})
          this.getUsuarios();
      },
      (err) =>{
        this.messageService.add({severity:'error', summary:'Operação não realizada', detail: 'Falha: ' + err})    
      }
    );
     
  }

  cancelarEdicao(){
    this.usuarioService.listarUsuarios().subscribe(
      (data) =>{
        this.messageService.add({severity:'error', summary:'Operação não realizada', detail:'Edição cancelada!'})
      } ); 
  }
  
  preparaEditarUsuario(cpf : string) {
    this.usuarioService.getUsuarioByCpf(cpf).subscribe(
      (data : Usuario) =>{
        this.usuario = data[0]; 
        this.usuario.nome =  data[0].nome;
        this.usuario.cpf = data[0].cpf; 
        this.usuario.senha = data[0].senha;
        this.usuario.email = data[0].email;
        this.usuario.perfil = data[0].perfil;
        this.usuario.endereco = data[0].endereco;
        this.usuario.telefone = data[0].telefone;
        this.usuario.cadastro = data[0].cadastro;
        this.usuario.ativo = data[0].ativo;
        console.log(this.usuario);

      },
      (err) =>{
        console.log(err);
      }
    );  
  
  }
}
