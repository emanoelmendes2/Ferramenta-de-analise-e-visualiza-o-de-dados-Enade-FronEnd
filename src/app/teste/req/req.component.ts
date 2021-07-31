import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  questionario:any ={
                        'Codigo_instituicao':'Codigo instituição',
                        'org_academica':'org_academica',
                        'area_curso':'Area curso',
                        'Codigo_curso':'Codigo curso',
                        'Modalidade_Ensino':'Modalidade Ensino',
                        'municipio_curso':'Municipio Curso',
                        'Idade':'Idade',
                        'Sexo':'Sexo 1)M 2)F',
                        'Ano_Final_EM':'Ano Final E.M',
                        'Inicio_Grad.': 'Inicio Graduação',
                        'Turno_Grad.':'Turno_Graduação',
                        'Presenca_Enade':'Presenca Enade',
                        'Questao_01':'Questão 1 - Qual o seu estado civil? 1)Solteiro(a) 2)Casado(a) 3)Separado(a) judicialmente/divorciado(a) 4)Viúvo(a) 5) Outro',
                        'Questao_02':'Questão 2 - Qual é a sua cor ou raça? 1)Branca 2) Preta 3) Amarela 4) Parda 5) Indígena 6) Não quero declarar',
                        'Questao_04':'Questão 4 - Até que etapa de escolarização seu pai concluiu? 1)Nenhuma 2)Ensino Fundamental: 1º ao 5º  3)  Ensino Fundamental: 6º ao 9º ano 4)Ensino Médio 5)Ensino Superior - Graduação 6) Pós-graduação',
                        'Questao_05':'Questão 5 - Até que etapa de escolarização sua mãe concluiu? 1)Nenhuma 2)Ensino Fundamental: 1º ao 5º  3)  Ensino Fundamental: 6º ao 9º ano 4)Ensino Médio 5)Ensino Superior - Graduação 6) Pós-graduação',
                        'Questao_07':'Questão 7 - Até que etapa de escolarização seu pai concluiu? 1)Nenhuma 2)Ensino Fundamental: 1º ao 5º  3)  Ensino Fundamental: 6º ao 9º ano 4)Ensino Médio 5)Ensino Superior - Graduação 6) Pós-graduação',
                        'Questao_08':'Questão 8 - Qual a renda total de sua família, incluindo seus rendimentos? 1)Até 1,5 salário mínimo  2)De 1,5 a 3 salários mínimos  3) ) De 3 a 4,5 salários mínimos 4)De 4,5 a 6 salários mínimos 5)De 6 a 10 salários mínimos 6)De 10 a 30 salários mínimos 7)Acima de 30 salários mínimos',
                        'Questao_09':'Questão 9 - Qual alternativa a seguir melhor descreve sua situação financeira (incluindo bolsas)? 1)Não tenho renda e meus gastos são financiados por programas governamentais. 2)Não tenho renda e meus gastos são financiados pela minha família ou por outras pessoas  3)Tenho renda, mas recebo ajuda da família ou de outras pessoas para financiar meus gastos 4)Tenho renda e não preciso de ajuda para financiar meus gastos 5)Tenho renda e contribuo com o sustento da família 6)Sou o principal responsável pelo sustento da família',
                        'Questao_11':'Questão 11 - Que tipo de bolsa de estudos ou financiamento do curso você recebeu para custear todas ou a maior parte das mensalidades? No caso de haver mais de uma opção, marcar apenas a bolsa de maior duração. 1)Nenhum, pois meu curso é gratuito. 2)Nenhum, embora meu curso não seja gratuito 3)ProUni integral 4)ProUni parcial, apenas 5)FIES, apenas 6)ProUni Parcial e FIES 7)Bolsa oferecida por governo estadual, distrital ou municipal 8)Bolsa oferecida pela própria instituição 9)Bolsa oferecida por outra entidade (empresa, ONG, outra) 10)Financiamento oferecido pela própria instituição 11)Financiamento bancário',
                        'Questao_12':'Questão 12 - Ao longo da sua trajetória acadêmica, você recebeu algum tipo de auxílio permanência? No caso de haver mais de uma opção, marcar apenas a bolsa de maior duração  1)Nenhum 2)Auxílio moradia 3)Auxílio alimentação 4)Auxílio moradia e alimentação 5)Auxílio permanência 6)Outro tipo de auxílio.',
                        'Questao_13':'Questão 13 - Ao longo da sua trajetória acadêmica, você recebeu algum tipo de bolsa acadêmica? No caso de haver mais de uma opção, marcar apenas a bolsa de maior duração 1)Nenhum. 2)Bolsa de iniciação científica 3)Bolsa de extensão 4)Bolsa de monitoria/tutoria 5)Bolsa PET 6)Outro tipo de bolsa acadêmica.',
                        'Questao_15':'Questão 15 - Seu ingresso no curso de graduação se deu por meio de políticas de ação afirmativa ou inclusão social? 1)Não  2)Sim, por critério étnico-racial 3)Sim, por critério de renda 4)Sim, por ter estudado em escola pública ou particular com bolsa de estudos 5)Sim, por sistema que combina dois ou mais critérios anteriores 6)Sim, por sistema diferente dos anteriores.',
                        'Questao_16':'Questão 16 - Em que unidade da Federação você concluiu o ensino médio? 1)AC 2)AL 3)AM 4)AP 5)BA 6)CE 7)DF 8)ES 9)GO 10)MA 11)MG 12)MS 13)MT 14)PA 15)PB 16)PE 17)PI 18)PR 19)RJ 20)RN 21)RO 22)RR 23)RS 24)SC 25)SE 26)SP 27)TO 28)Não se aplica',
                        'Questao_17':'Questão 17 - Em que tipo de escola você cursou o ensino médio? 1)Todo em escola pública. 2)Todo em escola privada (particular) 3)Todo no exterior 4)A maior parte em escola pública 5)A maior parte em escola privada (particular) 6)Parte no Brasil e parte no exterior.',
                        'Questao_21':'Questão 21 - Alguém em sua família concluiu um curso superior? 1) A 2)B',
                        'Questao_22':'Questão 22 - Excetuando-se os livros indicados na bibliografia do seu curso, quantos livros você leu neste ano? 1)Nenhum 2)Um ou dois 3)De três a cinco 4)De seis a oito 5)Mais de oito',
                        'Questao_23':'Questão 23 - Quantas horas por semana, aproximadamente, você dedicou aos estudos, excetuando as horas de aula? 1)Nenhuma, apenas assisto às aulas 2)De uma a três 3)De quatro a sete 4)De oito a doze 5)Mais de doze',
                        'Questao_27':'Questão 27 - As disciplinas cursadas contribuíram para sua formação integral, como cidadão e profissional. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_28':'Questão 28 - Os conteúdos abordados nas disciplinas do curso favoreceram sua atuação em estágios ou em atividades de iniciação profissional. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_29':'Questão 29 - As metodologias de ensino utilizadas no curso desafiaram você a aprofundar conhecimentos e desenvolver competências reflexivas e críticas. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_30':'Questão 30 - O curso propiciou experiências de aprendizagem inovadoras 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_31':'Questão 31 - O curso contribuiu para o desenvolvimento da sua consciência ética para o exercício profissional 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_32':'Questão 32 - No curso você teve oportunidade de aprender a trabalhar em equipe.  1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_33':'Questão 33 - O curso possibilitou aumentar sua capacidade de reflexão e argumentação 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_34':'Questão 34 - O curso promoveu o desenvolvimento da sua capacidade de pensar criticamente, analisar e refletir sobre soluções para problemas da sociedade1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_35':'Questão 35 - O curso contribuiu para você ampliar sua capacidade de comunicação nas formas oral e escrita1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_36':'Questão 36 - O curso contribuiu para o desenvolvimento da sua capacidade de aprender e atualizar-se permanentemente. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_37':'Questão 37 - As relações professor-aluno ao longo do curso estimularam você a estudar e aprender 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_38':'Questão 38 - Os planos de ensino apresentados pelos professores contribuíram para o desenvolvimento das atividades acadêmicas e para seus estudos. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_39':'Questão 39 - As referências bibliográficas indicadas pelos professores nos planos de ensino contribuíram para seus estudos e aprendizagens 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_40':'Questão 40 - Foram oferecidas oportunidades para os estudantes superarem dificuldades relacionadas ao processo de formação 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_41':'Questão 41 - A coordenação do curso esteve disponível para orientação acadêmica dos estudantes.  1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_42':'Questão 42 - O curso exigiu de você organização e dedicação frequente aos estudos 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_43':'Questão 43 - Foram oferecidas oportunidades para os estudantes participarem de programas, projetos ou atividades de extensão universitária. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_44':'Questão 44 - Foram oferecidas oportunidades para os estudantes participarem de projetos de iniciação científica e de atividades que estimularam a investigação acadêmica. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_45':'Questão 45 - O curso ofereceu condições para os estudantes participarem de eventos internos e/ou externos à instituição 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_46':'Questão 46 - A instituição ofereceu oportunidades para os estudantes atuarem como representantes em órgãos colegiados 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_47':'Questão 47 - O curso favoreceu a articulação do conhecimento teórico com atividades práticas 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_48':'Questão 48 - As atividades práticas foram suficientes para relacionar os conteúdos do curso com a prática, contribuindo para sua formação profissional , como cidadão e profissional 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_49':'Questão 49 - O curso propiciou acesso a conhecimentos atualizados e/ou contemporâneos em sua área de formação. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_50':'Questão 50 - O estágio supervisionado proporcionou experiências diversificadas para a sua formação. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_51':'Questão 51 - As atividades realizadas durante seu trabalho de conclusão de curso contribuíram para qualificar sua formação profissional 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_52':'Questão 52 - Foram oferecidas oportunidades para os estudantes realizarem intercâmbios e/ou estágios no país 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_53':'Questão 53 - Foram oferecidas oportunidades para os estudantes realizarem intercâmbios e/ou estágios fora do país. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_54':'Questão 54 - Os estudantes participaram de avaliações periódicas do curso (disciplinas, atuação dos professores, infraestrutura) 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_55':'Questão 55 - As avaliações da aprendizagem realizadas durante o curso foram compatíveis com os conteúdos ou temas trabalhados pelos professores 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_56':'Questão 56 - Os professores apresentaram disponibilidade para atender os estudantes fora do horário das aulas 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_57':'Questão 57 - Os professores demonstraram domínio dos conteúdos abordados nas disciplinas 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_58':'Questão 58 - Os professores utilizaram tecnologias da informação e comunicação (TICs) como estratégia de ensino (projetor multimídia, laboratório de informática, ambiente virtual de aprendizagem) 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_59':'Questão 59 - A instituição dispôs de quantidade suficiente de funcionários para o apoio administrativo e acadêmico. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_60':'Questão 60 - O curso disponibilizou monitores ou tutores para auxiliar os estudantes 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_61':'Questão 61 - As condições de infraestrutura das salas de aula foram adequadas. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_62':'Questão 62 - Os equipamentos e materiais disponíveis para as aulas práticas foram adequados para a quantidade de estudantes 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_63':'Questão 63 - Os ambientes e equipamentos destinados às aulas práticas foram adequados ao curso 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_64':'Questão 64 - A biblioteca dispôs das referências bibliográficas que os estudantes necessitaram 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_65':'Questão 65 - A instituição contou com biblioteca virtual ou conferiu acesso a obras disponíveis em acervos virtuais 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_66':'Questão 66 - As atividades acadêmicas desenvolvidas dentro e fora da sala de aula possibilitaram reflexão, convivência e respeito à diversidade 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_67':'Questão 67 - A instituição promoveu atividades de cultura, de lazer e de interação social 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                        'Questao_68':'Questão 68 - A instituição dispôs de refeitório, cantina e banheiros em condições adequadas que atenderam as necessidades dosseus usuários. 1)Discordo 2) 3) 4) 5) 6)Concordo Totalmente',
                      };
  array_questionario = new Array();



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



  enviarDados(){
    this.api.processar({"colums":this.form.value.checkArray, "ano":this.form.value.anosForm}).subscribe((response:any)=>{
      // this.reponse_api = response; 
      this.inicializargraph(response);
    });
    // this.api.get_knn(this.form.value.anosForm).subscribe((response:any)=>{  
    //   this.kVizinhos = response.kVizinhos;
    //   this.dobrasF = response.dobrasF;
    //   this.error  = response.erro;
    // })
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

      this.array_questionario.push(response.label)

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



