import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {
  follow: any = [];
  tasks: any;
  notfollowing: Boolean;

  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public store: AngularFireStorage,
    public data: AngularFireDatabase,
    public toastController: ToastController ) { }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.following();
  }
  goBack() {
    this.router.navigate(['/profile'], { replaceUrl: true });
  }
  async  following() {
    const databaseref = this.data.database.ref('/following/' + this.afAuth.auth.currentUser.uid);
    databaseref.once("value", (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(child => {
          let values = (child.val());
          this.follow.push(values);
          console.log(this.follow.length);
          this.tasks = this.follow;
        })

      }
      else {
        this.notfollowing = true;
      }

    })


  }
  async remove(i) {
    try {
      let user = this.afAuth.auth.currentUser.uid;
      let followingref = this.data.database.ref('/following/' + user);
      const followingstats = await followingref.child(i).remove();
      let followerref = this.data.database.ref('/followers/' + i);
      const followerstats = await followerref.child(user).remove();
      this.goBack();
      this.unfollowbuttonclick();
    } catch (error) {
      console.log(error);
    }
  }

  doRefresh(event) {
    this.goBack();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async unfollowbuttonclick() {
    const toast = await this.toastController.create({
        color: 'dark',
        duration: 2000,
        message: 'User Unfollowed',
        showCloseButton: true
      }).then(toast => {
        toast.present();
      });
    }



}
