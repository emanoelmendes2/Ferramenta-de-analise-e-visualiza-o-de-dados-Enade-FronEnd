import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscriber } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-req',
  templateUrl: './req.component.html',
  styleUrls: ['./req.component.css']
})
export class ReqComponent implements OnInit {
  form: FormGroup;
  active = 1;
  testeClasse = 'custom-tab'

 
  kVizinhos = 0;
  dobrasF = 0;
  error = 0;




  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins:any = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [];
  public radarChartType: ChartType = 'radar';
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };


  colunas:any = ['Codigo_instituicao','org_academica','area_curso','Codigo_curso','Modalidade_Ensino','municipio_curso','Idade','Sexo',
  'Ano_Final_EM','Inicio_Grad.','Turno_Grad.','Presenca_Enade','Questao_01','Questao_02','Questao_04',
  'Questao_05','Questao_07','Questao_08','Questao_09','Questao_11','Questao_12','Questao_13','Questao_15','Questao_16',
  'Questao_17','Questao_21','Questao_22','Questao_23','Questao_27','Questao_28','Questao_29','Questao_30','Questao_31',
  'Questao_32','Questao_33','Questao_34','Questao_35','Questao_36','Questao_37','Questao_38','Questao_39','Questao_40','Questao_41',
  'Questao_42','Questao_43','Questao_44','Questao_45','Questao_46','Questao_47','Questao_48','Questao_49','Questao_50','Questao_51',
  'Questao_52','Questao_53','Questao_54','Questao_55','Questao_56','Questao_57','Questao_58','Questao_59','Questao_60','Questao_61',
  'Questao_62','Questao_63','Questao_64','Questao_65','Questao_66','Questao_67','Questao_68']

  anos:any;
  public isCollapsed = true;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
      anosForm:[null],
    })
   }
  public variavel = '';
  public erro = 'falha';
  

  ngOnInit(): void {
    // this.consome();
    console.log(this.form.value.anosForm)
    
      this.api.getAnos().subscribe(
        (params:any) => {
          this.anos = params;
      })
    

  }

  lista_cep(a:any){
    //this.anos = a['localidade']
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
    // console.log(this.form.value.checkArray)
  }

  teste(){
    return [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }]
  }

  enviarDados(){
    this.api.processar({"colums":this.form.value.checkArray, "ano":this.form.value.anosForm}).subscribe((response:any)=>{
      // this.reponse_api = response; 
      this.inicializargraph(response);
    });
    this.api.get_knn(this.form.value.anosForm).subscribe((response:any)=>{  
      this.kVizinhos = response.kVizinhos;
      this.dobrasF = response.dobrasF;
      this.error  = response.erro;
    })
  }

  inicializargraph(data:any){
    var dados = [];
    for (var [key, value] of Object.entries(data)) {
      var response = this.process_values(key,value)

      if(this.barChartLabels.length==0){
        this.barChartLabels = response.labels
      }
      if(this.barChartLabels.length<response.labels.length){
        this.barChartLabels = response.labels
      }
      // console.log(response.data)
      dados.push({data:response.data, label:response.label})
    }
    this.barChartData = dados;
  }

  process_values(k:any,v:any){
    var label = []
    var data:any = new Array;
    for (var [key, value] of Object.entries(v)){
      label.push(key)
      data.push(value)
    } 
    return {data:data, label:k, labels:label}
  }

 // events
 public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

  
}



