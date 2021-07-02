import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReqComponent } from './teste/req/req.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './teste/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './compartilhado/navbar/navbar.component';
import { ChartsModule } from 'ng2-charts';
import { PainelEnvioComponent } from './painel-envio/painel-envio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';



@NgModule({
  declarations: [
    AppComponent,
    ReqComponent,
    AdminComponent,
    NavbarComponent,
    PainelEnvioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule,
    TabsModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }


