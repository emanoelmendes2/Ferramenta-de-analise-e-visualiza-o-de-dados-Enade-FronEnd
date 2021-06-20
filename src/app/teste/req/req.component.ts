import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-req',
  templateUrl: './req.component.html',
  styleUrls: ['./req.component.css']
})
export class ReqComponent implements OnInit {
  form: FormGroup;
  colunas:any = ['Codigo_instituicao','org_academica','area_curso','Codigo_curso','Modalidade_Ensino','municipio_curso','Idade','Sexo',
  'Ano_Final_EM','Inicio_Grad.','Turno_Grad.','Presenca_Enade','Questao_01','Questao_02','Questao_04',
  'Questao_05','Questao_07','Questao_08','Questao_09','Questao_11','Questao_12','Questao_13','Questao_15','Questao_16',
  'Questao_17','Questao_21','Questao_22','Questao_23','Questao_27','Questao_28','Questao_29','Questao_30','Questao_31',
  'Questao_32','Questao_33','Questao_34','Questao_35','Questao_36','Questao_37','Questao_38','Questao_39','Questao_40','Questao_41',
  'Questao_42','Questao_43','Questao_44','Questao_45','Questao_46','Questao_47','Questao_48','Questao_49','Questao_50','Questao_51',
  'Questao_52','Questao_53','Questao_54','Questao_55','Questao_56','Questao_57','Questao_58','Questao_59','Questao_60','Questao_61',
  'Questao_62','Questao_63','Questao_64','Questao_65','Questao_66','Questao_67','Questao_68']



  constructor(private pegarapi: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    })

   }
  public variavel = '';
  public erro = 'falha';

  ngOnInit(): void {
    this.consome();

  }

  consome(){
    this.pegarapi.pegar_cep().subscribe(
      (retorno) => {this.lista_cep(retorno)},
      () => console.log(this.erro)
    )

  }
  lista_cep(a:any){
    this.variavel = a['body']
  }

  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    console.log(this.form.value.checkArray)
  }


}

