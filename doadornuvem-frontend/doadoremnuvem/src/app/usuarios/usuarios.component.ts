import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { data, valHooks } from 'jquery';
import { ConfirmationService, MessageService } from 'primeng/api';
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

  formCadastro :FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private confimationService : ConfirmationService,
    private messageService : MessageService,
    private formBuilder :FormBuilder
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
  onSubmit() {
     if (this.formCadastro.valid){
      this.usuarioService.salvarUsuario(this.usuario).subscribe(
        (data) => {
         console.log("dados"+data[1])
          this.messageService.add({severity:'success', summary:'Operação realizada', detail:'Usuário atualizado com sucesso!'})
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
      console.log('Formalário inválid');
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
}
