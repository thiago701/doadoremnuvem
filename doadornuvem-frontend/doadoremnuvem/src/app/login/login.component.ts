import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from "./usuario";
import {MessageService} from "primeng/api";
import {FormBuilder} from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ FormBuilder, MessageService ],
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  returnUrl: string;

  constructor(private messageService: MessageService, private route: ActivatedRoute, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('page-login');
    this.returnUrl = '/inicio';
  }

  fazerLogin() {
    this.router.navigate([this.returnUrl]);
  }

}
