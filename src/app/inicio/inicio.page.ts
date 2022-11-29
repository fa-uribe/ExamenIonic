import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { StoragesService } from '../storages.service';
import { ApirestService } from '../apirest.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {

  ide : String;
  image : SafeResourceUrl;
  lista = [];

  constructor(private route: ActivatedRoute,
     private router: Router, 
     private domSanitizer: DomSanitizer, 
     private storages: StoragesService, 
     private apiRest: ApirestService) { 
      
    }

  ngOnInit() {

    this.ide = this.route.snapshot.paramMap.get('id');
    this.apiRest.getCursos(this.ide);
    this.lista = this.apiRest.listado;
    console.log(this.ide);
    console.log(this.lista);

  }

  async takePhoto(){
      const result = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        source: CameraSource.Camera,
        resultType: CameraResultType.Base64
      });
    
      this.image = this.domSanitizer.bypassSecurityTrustResourceUrl(result && result.base64String)
    };

  cerrarSesion(){
  
    this.storages.limpiar();
    this.router.navigate(['/home']);
  }
}

