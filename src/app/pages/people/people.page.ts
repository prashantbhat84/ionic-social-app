import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

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
  followstatus: any[] = [];

  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public store: AngularFireStorage,
    public data: AngularFireDatabase,
    public platform: Platform,
    public toastController: ToastController,
    public loadingController: LoadingController

  ) { }

  ngOnInit() {
    this.platform.backButton.subscribe(() => {
    });
  }

  ionViewWillEnter() {
    this.loading();
    this.getfollowinguser();
    this.getuser();

    setTimeout(() => {
      
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.followinguser.includes(this.tasks[i].id)) {
          this.followstatus[i] = true;
        }
        else {
          this.followstatus[i] = false;
        }
      }

    }, 500);
  }

  goBack() {
    this.router.navigate(['/tabs/tabfour'], { replaceUrl: true });
  }

  clicked(i) {
    this.follow(this.tasks[i].id);
   

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
      this.tasks = filteredarray;
    })
    
  }
  getfollowinguser() {
    const dataref = this.data.database.ref();
    const uref = dataref.child('/following/' + this.afAuth.auth.currentUser.uid);
    let dummy = [];
    uref.once("value", snap => {
      if (snap.exists()) {
        dummy = Object.values(snap.val());
        dummy.map(dum => {
          this.followinguser.push(dum.id);
        })
      }
    })
  }

  getuserdetails(id, node, nodeid) {
    let user = id;
    let name;
    let dbref = this.data.database.ref('/users/' + user);
    dbref.once('value', snap => {
      name = snap.val().fullname;
      let dataref = this.data.database.ref();
      let noderef = dataref.child('/' + node + '/' + nodeid + '/' + id)
      noderef.set({
        id: id,
        name: name,
      })
    })
  }

  unfollow(i) {

    this.followstatus[i] = false;
    let following = 'following'
    let followerid = this.tasks[i].id;
    let followingid = this.afAuth.auth.currentUser.uid;
    let reference = this.data.database.ref('/following/').child(followingid).child(followerid);
    reference.remove().then(() => {
    });
    let refer = this.data.database.ref('/followers/').child(followerid).child(followingid);
    refer.remove().then(() => {
    })
    this.goBack();
    this.unfollowbuttonclick();
  }

  follow(i) {
    this.followstatus[i] = false;
    let reference1 = this.data.database.ref('/following/' + this.afAuth.auth.currentUser.uid);
    let followerid = i;
    let followingid = this.afAuth.auth.currentUser.uid;
    this.getuserdetails(followerid, 'following', followingid);
    this.getuserdetails(followingid, 'followers', followerid);
    this.getfollowinguser();
    this.goBack();
    this.followbuttonclick();
  }

  doRefresh(event) {
    this.goBack();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async followbuttonclick() {
    const toast = await this.toastController.create({
        color: 'dark',
        duration: 2000,
        message: 'User Added ',
        showCloseButton: true
      }).then(toast => {
        toast.present();
      });
    }

    async unfollowbuttonclick() {
      const toast = await this.toastController.create({
          color: 'dark',
          duration: 2000,
          message: 'User Removed ',
          showCloseButton: true
        }).then(toast => {
          toast.present();
        });
      }

      async loading(){
        const loading = await this.loadingController.create({
          spinner: "lines",
          duration: 500,
          message: 'Loading...',
          translucent: true,
          cssClass: 'custom-class custom-loading'
        });
        return await loading.present();
      }

}
