import {Component, OnInit, ViewChild} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as $ from 'jquery';
import {MenuItem} from 'primeng/api';
import {TieredMenuModule} from 'primeng/tieredmenu';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Doador em Nuvem';
  mostrarMenu: boolean = true;
  itemsDoadores: MenuItem[];
  constructor() {
  }

  ngOnInit() {
    this.itemsDoadores = [
        {
        label: 'Doadores',
        icon:'fas fa-user-friends',
        items: [
            {
                label: 'Por tipo',
                icon:'fas fa-tint',
                routerLink:'/doadores-tipo'
            },
            {
                label: 'Por localidade',
                icon:'fas fa-map-marked-alt',
                routerLink:'/doadores-localidade'
            },
            {
                label: 'Todos',
                icon:'fas fa-users',
                routerLink:'/doadores'
            }
        ]
        },
    ]
}

  getUsuarioLogado() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}


