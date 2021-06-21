import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private readonly API_ROOT = `${environment.urlapi}`;

  pegar_cep(){
    return this.http.get(this.API_ROOT.concat('01001000/json/'));
  }

  post_cep(usuario:string,senha:string){
    const data = {"login":usuario,"senha":senha};
    return this.http.post(this.API_ROOT.concat('chamar'),data);
  }

  getAnos(){
    return this.http.get(`http://127.0.0.1:8000/api/anos`);
  }
  processar(dado:any){
    return this.http.post(`http://127.0.0.1:8000/api/processar`, dado );
  }
}
