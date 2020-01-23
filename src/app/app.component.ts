import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { ViewChild } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})



export class AppComponent {
  onYesHandler(arg0: string, arg1: string, onYesHandler: any, onNoHandler: any, arg4: string) {
    throw new Error("Method not implemented.");
  }
  onNoHandler(arg0: string, arg1: string, onYesHandler: any, onNoHandler: any, arg4: string) {
    throw new Error("Method not implemented.");
  }
  routerOutlet: any;
  generic: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    private router: Router,
    public network: Network,
    public alert: AlertController,

  ) {

    this.network.onDisconnect().subscribe(()=>{
      setTimeout(()=>{
      this.showAlert("Network Error ", "Please Check Your Connection and Try again");
      },3000);
    });

    this.initializeApp();
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === '/loginpage') {
        // or if that doesn't work, try
        navigator['app'].exitApp();
      } else {
        this.generic.showAlert("Exit", "Do you want to exit the app?", this.onYesHandler, this.onNoHandler, "backPress");
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          navigator['app'].exitApp();
        }}]
    })

    await alert.present()
  }

}
