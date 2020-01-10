import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {
  
  follow: any = [];
  tasks: any

  constructor(public router: Router, 
    public afAuth: AngularFireAuth,
    public store: AngularFireStorage,
    public data: AngularFireDatabase,) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.followers();
  }

  goBack() {
    this.router.navigate(['/profile'], { replaceUrl: true });
  }

  followers(){
    const databaseref = this.data.database.ref('/followers/'+ this.afAuth.auth.currentUser.uid);
    databaseref.once("value",(snapshot)=>{
      snapshot.forEach(child =>{
        let values = (child.val());
        this.follow.push(values);
        console.log(this.follow);
        
        this.tasks = this.follow;
      })
    })
  }

}
