import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.page.html',
  styleUrls: ['./prof.page.scss'],
})
export class ProfPage implements OnInit {
  datos : any;
  urlImage : any;
  ide : String;
  lista = [];

  constructor(private barcodeScanner : BarcodeScanner,
    private route: ActivatedRoute,
    private router: Router, 
    private apiRest: ApirestService) { }

  ngOnInit() {
    this.ide = this.route.snapshot.paramMap.get('id');
    this.apiRest.getAsigProf(this.ide);
    this.lista = this.apiRest.listado;
    console.log(this.ide);
    console.log(this.lista);
  }

  crearQR(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.datos).then((success) => this.urlImage = success.file)
  }
}
