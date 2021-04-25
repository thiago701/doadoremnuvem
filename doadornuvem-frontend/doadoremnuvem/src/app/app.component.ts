import {Component, OnInit, ViewChild} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Doador em Nuvem';
  mostrarMenu: boolean = true;
  constructor() {
  }

  getUsuarioLogado() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}


