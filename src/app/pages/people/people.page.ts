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
  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public store: AngularFireStorage,
    public data: AngularFireDatabase,
    public platform : Platform
  ) { }
  goBack() {
    this.router.navigate(['/tabs/tabfour'], { replaceUrl: true });
  }
  ngOnInit() {
    this.getuser();
    this.platform.backButton.subscribe(() => {
    });
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
}
