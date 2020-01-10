import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  fullname: string = ""
  phonenumber: string = ""
  email: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public db: AngularFireDatabase

  ) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  async register() {
    const { email, password, cpassword, fullname, phonenumber } = this
    if (password !== cpassword) {
      this.showAlert("Error !", "Passwords not getting Matched")
      return console.error(" Passwords not matching")
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      let id = res.user.uid;
      console.log(res)
      let following=0;
      let followers=0;
      this.showAlert("Success", "Welcome Aboard !!")
      let dbref = this.db.object('/users/' + id);
      dbref.set({
        email,fullname, phonenumber, id,followers,following
      });

      this.router.navigate(['/tabs']);
    } catch (error) {

      const { code, message } = error;
      if (code === "auth/email-already-in-use") {
        this.showAlert("Email Exists", message)
      }
      if (code === "auth/weak-password") {
       this.showAlert("Weak Password", "Password Length must be of minimum 6 characters");
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

}
