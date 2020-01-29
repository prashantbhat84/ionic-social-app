import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  @ViewChild(RouterOutlet, {static: false}) outlet: RouterOutlet;


  ionViewWillEnter() {
    this.getNotificationCount();
  }

  numberofnotifications: any;

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === "administration")
        this.outlet.deactivate();
    });
  }

  home() {  }
  recordings() {
  }
  notifications() {
    this.numberofnotifications = 0;
  }
  menu() {

  }
 
}
