import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AppComponent} from './app.component';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {InicioComponent} from './inicio/inicio.component';
import {ErrorMsgComponent} from './compartilhado/error-msg/error-msg.component';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {FileUploadModule} from 'primeng/fileupload';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ChartModule} from 'primeng/chart';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ProgressBarModule} from 'primeng/progressbar';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {DpDatePickerModule} from 'ng2-date-picker';
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { LoginComponent } from './login/login.component';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {InputMaskModule} from 'primeng/inputmask';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { HistoricoComponent } from './historico/historico.component';
import { ListarHistoricoComponent } from './historico/listar-historico/listar-historico.component';
import { ListarDoadoresComponent } from './doadores/listar-doadores/listar-doadores.component';

registerLocaleData(localePt, 'pt');

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  { path: 'inicio', component: InicioComponent},
  { path: 'historico', component: ListarHistoricoComponent},
  { path: 'cadastro-historico.ts', component: HistoricoComponent},
  { path: 'usuarios', component: ListarUsuariosComponent},
  { path: 'cadastro-usuario', component: UsuariosComponent},
  { path: 'login', component: LoginComponent},
  { path: 'doadores', component: ListarDoadoresComponent}
];

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    InicioComponent,
    ErrorMsgComponent,
    LoginComponent,
    ListarUsuariosComponent,
    HistoricoComponent,
    ListarHistoricoComponent,
    ListarDoadoresComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    FileUploadModule,
    CardModule,
    FieldsetModule,
    RadioButtonModule,
    InputSwitchModule,
    ToggleButtonModule,
    ChartModule,
    MessagesModule,
    MessageModule,
    ProgressBarModule,
    DpDatePickerModule,
    CalendarModule,
    InputNumberModule,
    DialogModule,
    ToastModule,
    ReactiveFormsModule,
    CascadeSelectModule,
    InputMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
