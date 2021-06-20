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
    return this.http.get(this.API_ROOT.concat('hg'));
  }

  post_cep(usuario:string,senha:string){
    const data = {"login":usuario,"senha":senha};
    return this.http.post(this.API_ROOT.concat('chamar'),data);
  }
}
