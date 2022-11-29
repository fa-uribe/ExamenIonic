import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  declarations: [AppComponent],
  imports: [NgxQRCodeModule, BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule, ],
  providers: [BarcodeScanner, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent], 
})
export class AppModule {}
