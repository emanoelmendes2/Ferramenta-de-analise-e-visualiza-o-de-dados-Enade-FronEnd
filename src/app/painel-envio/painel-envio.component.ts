import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-painel-envio',
  templateUrl: './painel-envio.component.html',
  styleUrls: ['./painel-envio.component.css']
})
export class PainelEnvioComponent implements OnInit {

  form: FormGroup;
  file:any;
  constructor( private api: ApiService, private fb: FormBuilder) {  this.form = this.fb.group({
    ano:null,
    arquivo:null
  })
}

  ngOnInit(): void {
  }

  onChangefile(files: any) {

    const fileItem = files.files.item(0);
    this.file = fileItem;
  }

  salvar(){

    console.log(this.form.value.arquivo)
    this.api.adicionarDados(this.form.value.ano, this.file).subscribe((response:any)=>{
      console.log(response)
    })
    console.log(this.form.value)
  }




}
