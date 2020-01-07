import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = ""
  password: string = ""
  constructor(public router: Router, 
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public db: AngularFireDatabase
    ) { }
  signup() {
    this.router.navigate(['/signup'], { replaceUrl: true });
  }
  forgot() {
    this.router.navigate(['/forgotpassword'], { replaceUrl: true });
  }
  async login() {
    const { email, password } = this
    try {
        const res = await this.afAuth.auth.signInWithEmailAndPassword(email,password);
        this.router.navigate(['/tabs/tabone']);
    } catch (err) {
      console.dir(err)
      if(err.code === "auth/user-not-found"){
        this.showAlert("Please Register","User with this email does not exist.")
        this.router.navigate(['/signup']);
      }
      if(err.code === "auth/wrong-password"){
        this.showAlert("Wrong Password", "Please enter the correct password")
      }
      if(err.code === "auth/user-disabled"){
        this.showAlert("Account Suspended", " Please Contact Support")
      }

    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })

    await alert.present()
  }
  ngOnInit() {
  }


}


