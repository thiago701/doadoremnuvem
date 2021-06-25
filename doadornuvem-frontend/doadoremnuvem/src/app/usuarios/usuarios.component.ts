import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { data, valHooks } from 'jquery';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Usuario } from '../login/usuario';
import { UsuarioService } from './usuario.service';
import {Router} from '@angular/router' ;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public tipoCadastro: any;
  public usuarios: Array<Usuario>;

  formCadastro :FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private confimationService : ConfirmationService,
    private messageService : MessageService,
    private formBuilder :FormBuilder,
    private router : Router,
    ) { 
      this.formCadastro = this.formBuilder.group({
        nome:[null, [Validators.required, Validators.minLength(3)]],
        email:[null,[Validators.required, Validators.email]],
        documento:[null, [Validators.required, Validators.minLength(11)]],
        endereco:[null, [Validators.required,Validators.minLength(3)]],
        telefone:[null, [Validators.required, Validators.minLength(3)]],
        senha:[null, [Validators.required, Validators.minLength(5)]],
        perfil:[null, [Validators.required]]
      });
    }

  ngOnInit(): void {
    // Seta uma classe no BODY para controle de interface
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('page-usuarios');
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


  onSubmit() {
     if (this.formCadastro.valid){
      this.usuarioService.salvarUsuario(this.usuario).subscribe(
        (data) => {
         this.messageService.add({severity:'success', summary:'Operação realizada', detail:'Usuário cadastrado com sucesso!'}) 
         this.router.navigateByUrl('/usuarios')
         .then(() => {
          window.location.reload();
        });
         this.getUsuarios();
        },
        (err) => {
          
          if (err.status == 400){
             this.messageService.add({severity:'error', summary:'Operação não realizada', detail:'Já existe um usuário cadastrado com este cpf!'})
          }else if (err.status == 500){
            this.messageService.add({severity:'error', summary:'Operação não realizada', detail:'Falha ao cadastrar o usuário. Parâmetros inválidos'})
          }else{
            this.messageService.add({severity:'error', summary:'Operação não realizada', detail:'Falha ao cadastrar o usuário:' + err.string}) 
          }
        }   
      );
    }else{
      console.log('Formulário inválido');
     Object.keys(this.formCadastro.controls).forEach(campo => {
       console.log(campo);      
     });      
    }
  }

  cancelarCadastro(){
    this.usuarioService.listarUsuarios().subscribe(
      (data) =>{
        this.messageService.add({severity:'error', summary:'Operação não realizada', detail:'Cadastro cancelado!'})
      } ); 
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
  verificaValidTouched(campo){
    return !this.formCadastro.get(campo).valid && this.formCadastro.get(campo).touched;
  }
  aplicaCssErro(campo){
    return{
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)

    }
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
