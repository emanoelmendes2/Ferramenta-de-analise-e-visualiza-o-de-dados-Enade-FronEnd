import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainelEnvioComponent } from './painel-envio/painel-envio.component';
import { ReqComponent } from './teste/req/req.component';

const routes: Routes = [
  {
    path: '',
    component: PainelEnvioComponent,
  },
  {
    path: 'graph',
    component: ReqComponent,
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
