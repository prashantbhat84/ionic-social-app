import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, } from '@angular/router';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  people: any = [];
  tasks: any;
  importedData: any;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    public store: AngularFireStorage,
    public data: AngularFireDatabase,
    public platform: Platform,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.getuser();
    if (this.route.snapshot.data['special']) {
      this.importedData = this.route.snapshot.data['special'];
    }
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

  goBack() {
    this.router.navigate(['/tabs/tabthree'], { replaceUrl: true });
  }

  send(i,name){
  let currentuserid= this.importedData.userid;
  let postid= this.importedData.id;
  let dt = new Date();   
    console.log(this.tasks[i].id);
    console.log(name);
    let dbref=this.data.database.ref('/users/'+currentuserid);
    dbref.once('value',(snap)=>{
      console.log(snap.val().fullname);
      let dbnot= this.data.database.ref('/notifications/'+this.tasks[i].id);
      dbnot.push({
          name:snap.val().fullname,
          date1: dt.getDate() + '/' + dt.getMonth() + 1 + '/' + dt.getFullYear(),
         timestamp: dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds(),
         ID:postid,
         userid:currentuserid,
         action:'shared'
      })
      
    })
  }


  
}

