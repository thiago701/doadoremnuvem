import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/login/usuario';
import { UsuarioService } from '../usuario.service';
import { ConfirmationService, PrimeNGConfig, MessageService} from 'primeng/api';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  public usuarios: Array<Usuario> = [];
  public usuario : Usuario = new Usuario();

  ;

  constructor(
    private usuarioService: UsuarioService, 
    private confimationService : ConfirmationService,
    private messageService : MessageService) 
    { }

  ngOnInit(): void {
    this.listarUsuarios();
    // Seta uma classe no BODY para controle de interface
    const body = document.getElementsByTagName('body')[0];
    body.className = '';
    body.classList.add('page-usuarios'); // page.sass + style.css
  }

  listarUsuarios() {
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
    this.usuarioService.editarUsuario(usuario).subscribe(data => {});
  }

  excluirUsuario(usuario: Usuario) {
    this.confimationService.confirm({
      message:'Deseja realmente excluir este usuário?',
      header:'Confirmação',
      icon: 'fas fa-question',
      accept:() => {
        this.usuarioService.excluirUsuario(usuario).subscribe(data => {});
        this.listarUsuarios();
        this.messageService.add({severity:'success',
        summary:'Sucesso', detail:'Exclusão realizada!'})
      } ,
      reject:() =>{
        this.messageService.add({severity:'error', summary:'Cancelado', detail:'Operação não realizada'})
      } 
    })
  }
}
