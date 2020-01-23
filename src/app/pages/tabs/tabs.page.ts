import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  numberofnotifications: any;

  ionViewWillEnter() {
    this.getNotificationCount();
  }

  async getNotificationCount() {
    const user = this.afAuth.auth.currentUser.uid;
    const dbref = this.data.database.ref('/notifications/');
    const snap = await dbref.once('value');
    if (snap.child(user).exists()) {
      return this.numberofnotifications = snap.child(user).numChildren();
    }
    this.numberofnotifications = 0;
  }

  constructor(
    public afAuth: AngularFireAuth,
    public data: AngularFireDatabase,
  ) { }
  home() {

  }
  recordings() {

  }
  notifications() {
    this.numberofnotifications = 0;
  }
  menu() {

  }
  ngOnInit() {
  }
}
