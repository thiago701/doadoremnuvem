import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/login/usuario';
import { UsuarioService } from '../usuario.service';
import { ConfirmationService, PrimeNGConfig, MessageService} from 'primeng/api';
import { Table } from 'primeng/table';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  public usuarios: Array<Usuario> = [];
  public usuario : Usuario = new Usuario();
  
  @ViewChild('dt') table: Table;

  constructor(
    private usuarioService: UsuarioService, 
    private confimationService : ConfirmationService,
    private messageService : MessageService,
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
    this.refreshComponent();
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
        this.messageService.add({severity:'success',
        summary:'Sucesso', detail:'Exclusão realizada!'})
      } ,
      reject:() =>{
        this.messageService.add({severity:'error', summary:'Cancelado', detail:'Operação não realizada'})
      } 
    })
  }
  refreshComponent(){
    this.router.navigate([this.router.url])
 }
}
