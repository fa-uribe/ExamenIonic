import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class Api2Service {
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

  async crearClase(idAsig: String, num: Number){
    let url = this.urlBaseApi + 'asignatura/' + idAsig;
    this.httpClient.patch(url, {numClases: num}).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });;
  }

  async registrarAsist(idAs : Number, idAl: Number){

    let url = this.urlBaseApi + 'asignatura_alumno/';
    let url2 = url;
    let clases = 0;
    this.listado = [];
    return new Promise((resolve, rejects) => 
    {
      this.httpClient.get(url).subscribe((data:[]) =>
      {
        resolve(data);
        data.forEach(item => { 
          if(item['idAlumn'] == idAl && item['idAsig'] == idAs){
            console.log(item['id']);
            url2 += item['id'];
            clases = item['asistencia'];
            clases += 1;
            console.log(url2);
            console.log(clases);
            this.httpClient.patch(url2, {asistencia : clases}).subscribe(data => {
              console.log(data);
            }, error => {
              console.log(error);
            });
          }
        })
      },
      error =>
      {
        console.log("Error en el servidor")
      })
    });
  }

}
