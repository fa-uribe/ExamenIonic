import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApirestService } from '../apirest.service';
import { Api2Service } from '../api2.service';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {

  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';

  createdCode = null;
  ide : String;
  lista = [];

  constructor(private route: ActivatedRoute, 
    private apiRest: ApirestService,
    private api2 : Api2Service) { }

  ngOnInit() {
    this.ide = this.route.snapshot.paramMap.get('id');
    this.apiRest.getAsignatura(this.ide);
    this.lista = this.apiRest.listado;
    console.log(this.lista);
  }

  crearQR(content : String, numC: number){
    this.createdCode = content;
    let clase = numC + 1;
    console.log(clase);
    this.api2.crearClase(this.ide, clase)

  }

}
