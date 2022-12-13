import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApirestService {
  listado = [];
  item : any;
  private urlBaseApi = 'http://localhost:3000/';
  constructor(
    private httpClient: HttpClient) { 
    }

  getUsers()
  {
    let url = this.urlBaseApi + 'usuario/';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listado.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }

  getAlumnos(){
    let url = this.urlBaseApi + 'alumno/';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listado.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }

  getCursos(id : String){
    let url = this.urlBaseApi + 'asignatura_alumno/';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { 
          if(item['idAlumn'] == id)
            this.listado.push(item); 
        })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }

  getAsignatura(id : String){
    let url = this.urlBaseApi + 'asignatura/';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { 
          if(item['id'] == id)
            this.listado.push(item); 
        })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }

  getProfesores(){
    let url = this.urlBaseApi + 'profesor/';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { this.listado.push(item); })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }

  getAsigProf(id : String){
    let url = this.urlBaseApi + 'asignatura/';
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { 
          if(item['idProf'] == id)
            this.listado.push(item); 
        })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }

  async registrarAsist(idAs : Number, idAl: Number){
    let url = this.urlBaseApi + 'asignatura_alumno/';
  }

}

