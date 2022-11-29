import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  mensaje: String;
  nombre: String;
  usuarios = [];

  constructor(private alertController: AlertController,
              private router : Router,
              private apirest: ApirestService) { }

  ngOnInit() {
    this.apirest.getUsers();
  }

  async checkear(nom: HTMLInputElement)
  {
    if(nom.value == "")
    {
      this.mensaje = "Ingrese email";
    }
    else if(!this.apirest.listado.find(({email}) => email === nom.value))
    {
      this.mensaje = "Usuario no existe";
    }
    else
    {
      const alert = await this.alertController.create({
        header: 'Aviso',
        subHeader: 'Recuperar contraseña',
        message: 'Se ha enviado un correo electronico de recuperación',
        buttons: ['OK'],
      });    
      await alert.present();

      this.router.navigate(['/home']);
    }
  }
}
