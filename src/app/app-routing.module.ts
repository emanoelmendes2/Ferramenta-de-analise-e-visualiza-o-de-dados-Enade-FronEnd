import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReqComponent } from './teste/req/req.component';

const routes: Routes = [
  {
    path: '',
    component: ReqComponent,
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
