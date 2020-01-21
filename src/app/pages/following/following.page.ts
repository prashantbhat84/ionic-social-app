import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {
  follow: any = [];
  tasks: any
  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public store: AngularFireStorage,
    public data: AngularFireDatabase, ) { }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.following();
  }
  goBack() {
    this.router.navigate(['/profile'], { replaceUrl: true });
  }
  following() {
    const databaseref = this.data.database.ref('/following/' + this.afAuth.auth.currentUser.uid);
    databaseref.once("value", (snapshot) => {
      snapshot.forEach(child => {
        let values = (child.val());
        this.follow.push(values);
        console.log(this.follow);
        this.tasks = this.follow;
      })
    })
  }
  async remove(i) {
    try {
      let user = this.afAuth.auth.currentUser.uid;
      let followerref = this.data.database.ref('/following/' + user);
      const followerstats = await followerref.child(i).remove();
      this.goBack();
      console.log("calling Following method");
    } catch (error) {
      console.log(error);
    }
  }
}
