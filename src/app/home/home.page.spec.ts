import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('Login: verificar boton login', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('error de login', () => {
    (<HTMLInputElement>document.getElementById('txtEmail')).value='juan';
    (<HTMLInputElement>document.getElementById('txtClave')).value='1234';
    document.getElementById('btnLogin')?.click();
    const mensaje = (<HTMLInputElement>document.getElementById('Error')).value;
    expect(mensaje).toEqual('Usuario no existe');
  });
});

describe('Login: verificar usuario vacio', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('error de usuario', () => {
    (<HTMLInputElement>document.getElementById('txtEmail')).value='';
    (<HTMLInputElement>document.getElementById('txtClave')).value='1234';
    document.getElementById('btnLogin')?.click();
    const mensaje = (<HTMLInputElement>document.getElementById('Error')).value;
    expect(mensaje).toEqual('Ingrese nombre de usuario');
  });
});

describe('Login: verificar contraseña vacia', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('error de contraseña', () => {
    (<HTMLInputElement>document.getElementById('txtEmail')).value='email@email.com';
    (<HTMLInputElement>document.getElementById('txtClave')).value='';
    document.getElementById('btnLogin')?.click();
    const mensaje = (<HTMLInputElement>document.getElementById('Error')).value;
    expect(mensaje).toEqual('Por favor, ingrese su contraseña');
  });
});
