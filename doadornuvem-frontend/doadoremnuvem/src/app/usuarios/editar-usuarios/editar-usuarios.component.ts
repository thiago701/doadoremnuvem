import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../login/usuario';
import {UsuarioService} from '../usuario.service';
import {ActivatedRoute} from '@angular/router' ;
import {MessageService, ConfirmationService} from 'primeng/api';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  public usuarios: Array<Usuario>;

  formEdicao :FormGroup;

  constructor(
    public usuarioService : UsuarioService,
    private activatedRoute : ActivatedRoute,
    private confimationService : ConfirmationService,
    private messageService : MessageService,
    private formBuilder :FormBuilder
    ) {
      this.formEdicao = this.formBuilder.group({
        nome:[null, [Validators.required, Validators.minLength(3)]],
        email:[null,[Validators.required, Validators.email]],
        documento:[null, [Validators.required, Validators.minLength(11)]],
        endereco:[null, [Validators.required,Validators.minLength(3)]],
        telefone:[null, [Validators.required, Validators.minLength(3)]],
        senha:[null, [Validators.required, Validators.minLength(5)]],
        perfil:[null, [Validators.required]]
      });
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
        this.usuario.id = data[0].id;
        this.usuario.nome =  data[0].nome;
        this.usuario.cpf = data[0].cpf; 
        this.usuario.senha = data[0].senha;
        this.usuario.email = data[0].email;
        this.usuario.perfil = data[0].perfil;
        this.usuario.endereco = data[0].endereco;
        this.usuario.telefone = data[0].telefone;
        this.usuario.cadastro = data[0].cadastro;
        this.usuario.ativo = data[0].ativo;
      },
      (err) =>{
        console.log(err);
      }
    );  
  
  }

  validarCpf(cpf:string){
    
    if (cpf == null) {
      return false;
    }
  
    if (cpf.length < 11) {
      return false;
    }
  
    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.toString();
    cpfAux = cpfAux.substring(0,9); 
    for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) { 
          return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
        digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + (numero * j);
        j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
        digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
       
      return false;
    }
    else {
        return true;
    }
}
}
