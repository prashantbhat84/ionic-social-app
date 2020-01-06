import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  email: string = ""
 

  constructor( public router:Router,
    public afAuth: AngularFireAuth,
    public alert: AlertController
    ) { }

  goBack() {
    this.router.navigate(['/login'],{ replaceUrl: true });
  }

  ngOnInit() {
  }
  
  sendemail(){
    const { email } = this
    console.log(email);
    this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.router.navigate(['/login'],{ replaceUrl: true });
      })
      .catch(error => {
       this.showAlert("Invalid Email", "This Email does not exist please check")
      });
  }
  
  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })

    await alert.present()
  }
}
