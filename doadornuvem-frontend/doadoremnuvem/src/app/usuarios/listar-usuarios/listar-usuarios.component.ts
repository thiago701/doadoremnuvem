import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Usuario } from 'src/app/login/usuario';
import { UsuarioService } from '../usuario.service';
import { ConfirmationService, PrimeNGConfig, MessageService} from 'primeng/api';
import { Table } from 'primeng/table';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css', './listar-usuarios.component.scss']
})
export class ListarUsuariosComponent implements OnInit {

  public usuarios: Array<Usuario> = [];
  public usuario : Usuario = new Usuario();
  public rota : Router;
  
  @ViewChild('dt') table: Table;

  constructor(
    private usuarioService: UsuarioService, 
    private confimationService : ConfirmationService,
    private messageService : MessageService,
    @Inject(DOCUMENT) private _document: Document,
    private router: Router, private activatedRoute: ActivatedRoute) 
    { }

  ngOnInit(): void {
    
    // Seta uma classe no BODY para controle de interface
    const body = document.getElementsByTagName('body')[0];
    body.className = '';
    body.classList.add('page-usuarios'); // page.sass + style.css
    this.listarUsuarios();
    
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
        this.usuarioService.excluirUsuario(usuario).subscribe(
          (data) => {
          this.listarUsuarios();
        },
        (err) => {
          console.log(err);
        }
      );
        this.messageService.add({severity:'success',
        summary:'Sucesso', detail:'Exclusão realizada!'})
      } ,
      reject:() =>{
        this.messageService.add({severity:'error', summary:'Cancelado', detail:'Operação não realizada'})
      }
    })  
 }
}
