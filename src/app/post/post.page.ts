import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoragesService } from '../storages.service';
import { ApirestService } from '../apirest.service';
import { Api2Service } from '../api2.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})

export class PostPage implements OnInit {

  ide : String;
  lista = [];
  listaProf = [];

  code: any;
  scanActive = false;
  scanResult = null;
  @ViewChild('video',{static:false}) video: ElementRef;
  @ViewChild('canvas',{static:false}) canvas: ElementRef;
  videoElement: any;
  canvasElement: any;
  canvasContext: any;
  loading: HTMLIonLoadingElement;

  constructor(private route: ActivatedRoute, 
    private apiRest: ApirestService,
    private apiRest2: Api2Service,
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController, 
    private loadingCtrl: LoadingController,
    private storages : StoragesService,
    private alertController: AlertController
    ) { }
  
  ngAfterViewInit(){
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  ngOnInit() {
    this.ide = this.route.snapshot.paramMap.get('id');
    this.apiRest.getAsignatura(this.ide);
    this.lista = this.apiRest.listado;
    console.log(this.lista);

  }

  async escanear(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data', barcodeData);
      }).catch(err => {
        console.log('Error', err);
      });
    };
  
  async startScan(){
    const stream = await navigator.mediaDevices.getUserMedia({
    video: {facingMode: 'environment'}
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline',true);
    this.videoElement.play();
    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
    requestAnimationFrame(this.scan.bind(this));
    }

  async scan(){
    if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
      if(this.loading){
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width,imageData.height,{
        inversionAttempts: 'dontInvert'
      });

      if(code){
        this.scanActive = false;
        this.scanResult = code.data;
        if (this.ide != this.scanResult){
          const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'Registrar asistencia',
            message: 'El Codigo QR escaneado no corresponde a la asignatura seleccionada',
            buttons: ['OK'],
          });    
          await alert.present();
          this.scanResult=null;
          this.stopScan();
        }

        else{
          this.showQrToast();
          let ida =this.storages.leer('id');
          this.apiRest2.registrarAsist(this.scanResult);
        }

      }

      else{
        if(this.scanActive){
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    }
    else{
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  reset(){
    this.scanResult=null;
  }

  stopScan(){
    this.scanActive = false;
  }

  async showQrToast(){
    const toast = await this.toastCtrl.create({
    message: `Open ${this.scanResult}?`,
    position: 'top',
    buttons:[{
      text: 'Open',
      handler: () =>{
        window.open(this.scanResult, '_system','location=yes');
      }
    }]
    });

    toast.present();
  }

}
