import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tabthree',
  templateUrl: './tabthree.page.html',
  styleUrls: ['./tabthree.page.scss'],
})
export class TabthreePage implements OnInit {

  notifications: any[];
  notlen: any;


  constructor(public afAuth: AngularFireAuth,
    public data: AngularFireDatabase,
    public router: Router,
    private dataService: DataService ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
  this.getusernotifications();
  }

  post(i){
     let data={
       id:this.notifications[i].ID,
       userid:this.notifications[i].userid
     }
  this.dataService.setData(42, data);
    this.router.navigateByUrl('/post/42');
  }

  async getusernotifications() {

    const user = this.afAuth.auth.currentUser.uid;
    const dbref = this.data.database.ref('/notifications/');
    const snap = await dbref.once('value');
    if (snap.child(user).exists()) {
      const notify = snap.child(user).val();
      this.notifications = (Object.values(notify)).reverse();
      return this.notlen = this.notifications.length;
    }
    this.notlen = 0;

  }

}

