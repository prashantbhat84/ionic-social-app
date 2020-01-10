import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name;
  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
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
  ngOnInit() {


  }


  ionViewDidEnter(){
    this.getdetails();
  }
  getdetails(){
    let user = this.afAuth.auth.currentUser.uid;
   
         
    let dbref = this.db.database.ref('/users/'+user);
    dbref.once('value',snap=>{
         // this.name= snap.val().fullname;
         //console.log(snap.val().fullname);
         this.name=snap.val().fullname;
         
    })
  }
  

}
