import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { database } from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name;
  followerlength;
  followinglength;
  follow: any = [];
  tasks: any

  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public data: AngularFireDatabase,
  ) { }


  Followers() {
    this.router.navigate(['/followers'], { replaceUrl: true });
  }
  Following() {
    this.router.navigate(['/following'], { replaceUrl: true });

  }
  goBack() {
    this.router.navigate(['/tabs/tabfour'], { replaceUrl: true });
  }
  ngOnInit() {}
  ionViewDidEnter() {
    this.getdetails();
    this.followers();
    this.following();
  }
  getdetails() {
    let user = this.afAuth.auth.currentUser.uid;
    let dbref = this.data.database.ref('/users/' + user);
    dbref.once('value', snap => {
      this.name = snap.val().fullname;

    })
  }

 async followers() {
    const databaseref = this.data.database.ref('/followers/');
    const snapshot = await databaseref.once('value');
    if (!snapshot.child(this.afAuth.auth.currentUser.uid).exists()) {
      return this.followerlength = 0;
    }
    this.followerlength = (snapshot.child(this.afAuth.auth.currentUser.uid).numChildren());
  }


  async following() {
    const databaseref = this.data.database.ref('/following/');
    const snapshot = await databaseref.once('value');
    if (!snapshot.child(this.afAuth.auth.currentUser.uid).exists()) {
      return this.followinglength = 0;
    }
    this.followinglength = (snapshot.child(this.afAuth.auth.currentUser.uid).numChildren());
  }


}
