import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  mostrarMenu: boolean = false;
  exibirExemplos: boolean;

  constructor() {
    this.exibirExemplos = false;
  }

  ngOnInit() {
    // Seta uma classe no BODY para controle de interface
    const body = document.getElementsByTagName('body')[0];
    body.className = '';
    body.classList.add('page-inicio'); // page.sass + style.css
  }

}
