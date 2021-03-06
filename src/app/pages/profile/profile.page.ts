import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataService } from '../../services/data.service';

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
  tasks: any;
  time;
  length: any;
  posts: any = [];
  

  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public data: AngularFireDatabase,
    private dataService: DataService
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

  share(i) {
    let data = {
      postid: this.posts[i].ID,
      userid: this.afAuth.auth.currentUser.uid,
      ownerid:this.afAuth.auth.currentUser.uid,
      ownername:name
    }
    this.dataService.setData(42, data);
    this.router.navigateByUrl('/share/42');
  }
  ngOnInit() { }

  ionViewDidEnter() {
    this.getdetails();
    this.followers();
    this.following();
    this.getpostdetails();
  }

  getdetails() {
    let user = this.afAuth.auth.currentUser.uid;
    let dbref = this.data.database.ref('/users/' + user);
    dbref.once('value', snap => {
      this.name = snap.val().fullname;
    })
  }

  async getpostdetails() {
    let testarray = [];
    const user = this.afAuth.auth.currentUser.uid;
    const dbref = this.data.database.ref('/posts/');
    const snap = await dbref.once('value');
    if (snap.child(user).exists()) {
      const post = snap.child(user).val();
      this.posts = (Object.values(post)).reverse();
      
      return this.length = this.posts.length;
    }
    this.length = 0;
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
