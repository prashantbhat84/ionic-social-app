import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-tabthree',
  templateUrl: './tabthree.page.html',
  styleUrls: ['./tabthree.page.scss'],
})
export class TabthreePage implements OnInit {

  notifications: any[];
  notlen:any;

  constructor(public afAuth: AngularFireAuth,
    public data: AngularFireDatabase, ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.getusernotifications();
  }

  async getusernotifications(){
    const user= this.afAuth.auth.currentUser.uid;
    const dbref= this.data.database.ref('/notifications/');
      const snap= await dbref.once('value');
      if(snap.child(user).exists()){
         const notify= snap.child(user).val();
         this.notifications=(Object.values(notify));
         return  this.notlen=this.notifications.length;
         
    
      }
      this.notlen=0;
        
    
 

     

  }

}

