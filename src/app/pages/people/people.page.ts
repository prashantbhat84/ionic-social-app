import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  people: any = [];
  tasks: any
  id: any
  followinguser: any = [];
  followstatus: any = [];

  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public store: AngularFireStorage,
    public data: AngularFireDatabase,
    public platform: Platform,

  ) { }

  ionViewWillEnter() {
    this.getfollowinguser();
  }
  ionViewDidEnter() {
    for (let i = 0; i < this.tasks.length; i++) {
      for (let j = 0; j < this.followinguser.length; j++) {
        if (this.tasks[i].id === this.followinguser[j]) {
          this.followstatus[i] = true;
        }
        else {
          this.followstatus[i] = false;
        }
      }
    }
    console.log(this.followstatus);
  }
  goBack() {
    this.router.navigate(['/tabs/tabfour'], { replaceUrl: true });
  }
  ngOnInit() {
    this.getuser();
    this.platform.backButton.subscribe(() => {
    });
  }
  clicked(i) {
    this.follow(this.tasks[i].id);
    console.log(i);
  }
  checkfollowinguser(id) {
    setTimeout(() => {
      if (this.followinguser.includes(id)) {
        return this.followstatus = true;
        console.log('true');
      }
      return this.followstatus = false;
    }, 1000);
  }
  getuser() {
    const dbref = this.data.database.ref();
    const urlref = dbref.child('/users');
    urlref.once("value", (snapshot) => {
      snapshot.forEach(child => {
        let values = (child.val());
        this.people.push(values);
      })
      let filteredarray = this.people.filter(val => val.id !== this.afAuth.auth.currentUser.uid);
      //console.log(filteredarray);
      this.tasks = filteredarray;
      // console.log(this.tasks);
    })
  }
  getfollowinguser() {
    const dataref = this.data.database.ref();
    const uref = dataref.child('/following/' + this.afAuth.auth.currentUser.uid);
    let dummy = [];
    uref.once("value", snap => {
      dummy = Object.values(snap.val());
      dummy.map(dum => {
        this.followinguser.push(dum.id);
      })
    })
  }
  getuserdetails(id, node, nodeid) {
    let user = id;
    let name;
    let dbref = this.data.database.ref('/users/' + user);
    console.log(dbref);
    dbref.once('value', snap => {
      name = snap.val().fullname;
      console.log(name);
      let dataref = this.data.database.ref();
      let noderef = dataref.child('/' + node + '/' + nodeid + '/' + id)
      noderef.set({
        id: id,
        name: name,

      })
    })
  }
  
  unfollow(i) {
    console.log('inside unfollow');
    this.followstatus[i] = false;
    let following = 'following'
    let followerid = this.tasks[i].id;
    let followingid = this.afAuth.auth.currentUser.uid;
    let reference = this.data.database.ref('/following/').child(followingid).child(followerid);
    reference.remove().then(() => {
      console.log('removed');
    });
    let refer = this.data.database.ref('/followers/').child(followerid).child(followingid);
    refer.remove().then(() => {
      console.log('removed followers');
    })
  }

  follow(i) {
    this.followstatus[i] = false;
    let reference1 = this.data.database.ref('/following/' + this.afAuth.auth.currentUser.uid);
    console.log(reference1);
    let followerid = i;
    let followingid = this.afAuth.auth.currentUser.uid;
    this.getuserdetails(followerid, 'following', followingid);
    this.getuserdetails(followingid, 'followers', followerid);
    this.getfollowinguser();
  }
}
