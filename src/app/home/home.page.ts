import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApirestService } from '../apirest.service';
import { StoragesService } from '../storages.service';
import { Api2Service } from '../api2.service';
import { ApiRest3Service } from '../api-rest3.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  mensaje : String;
  lista = [];
  lista2 = [];
  lista3 = [];

  constructor(private router: Router,
    private apirest: ApirestService,
    private storages : StoragesService,
    private api2 : Api2Service,
    private api3 : ApiRest3Service
    ) { }

  ngOnInit(): void {
    this.apirest.getUsers();
    this.lista = this.apirest.listado;
    console.log(this.lista);
    this.storages.init();
    this.api2.getAlumnos();
    this.lista2 = this.api2.listado;
    this.api3.getProfesores();
    this.lista3 = this.api3.listado;
  }

  async checkear(nom: HTMLInputElement, cont: HTMLInputElement) {
    //console.log(this.apirest.listado.find(({username}) => username === this.nombre));
    this.lista = this.apirest.listado.find(({email}) => email === nom.value);
 
    if(nom.value == "") {
      this.mensaje = "Ingrese nombre de usuario";
    }
    else if(cont.value == "") {
      this.mensaje = "Por favor, ingrese su contraseña";
    }
    else if(!this.apirest.listado.find(({email}) => email === nom.value)) {
      this.mensaje = "Usuario no existe";
    }
    else if(!this.apirest.listado.find(({clave}) => clave === cont.value)){
      this.mensaje = "Contraseña incorrecta";
    }
    else if(this.lista['tipoU'] == 1){

      console.log(this.api2.listado.find(({email}) => email === nom.value));

      this.lista2 = this.api2.listado.find(({email}) => email === nom.value);
      console.log(this.lista2);
      this.storages.agregar('id', this.lista2['id']);
      this.router.navigate(['/inicio', this.lista2['id']]);
      nom.value = '';
      cont.value = '';
      this.mensaje = '';
    }
    else {

      this.lista3 = this.api3.listado.find(({email}) => email === nom.value);
      this.storages.agregar('id', this.lista3['id']);
      this.router.navigate(['/prof', this.lista3['id']]);
      nom.value = '';
      cont.value = '';
      this.mensaje = '';
    }
  }
}

