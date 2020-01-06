import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabone',
  templateUrl: './tabone.page.html',
  styleUrls: ['./tabone.page.scss'],
})
export class TabonePage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router:Router,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    let user = this.afAuth.auth.currentUser
    console.log(user.uid);

    console.log(user.emailVerified);
    if (user.emailVerified === false) {
      console.log("email not verified");
      user.sendEmailVerification().then(() => {
        console.log("email sent through profile");
      });
      this.showAlert("Verify Email","Please Check your Email for verification instructions")

      this.afAuth.auth
        .signOut()
        .then(() => {
          console.log("signed out");
          this.router.navigate(['/login'],{ replaceUrl: true });
        })
        .catch(e => {
          console.log(e);
        });
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
