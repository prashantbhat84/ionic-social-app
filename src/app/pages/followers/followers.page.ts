import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {

  follow: any = [];
  tasks: any = []; // followers array
  following: any = [];
  stats: any = [];
  isfollowing:any=[];
  hasfollowers:Boolean;
  hasfollowing:Boolean;
  nofollowers:Boolean;
  nofollowing:Boolean;
  

  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public store: AngularFireStorage,
    public data: AngularFireDatabase,
    public toastController: ToastController ) { }

  ngOnInit() {   }

  ionViewWillEnter() {
    this.followers();
    this.getuserfollowing();
    setTimeout(() => {
      if (this.hasfollowers == true && this.hasfollowing == true) {
        this.getstats();
      }
      console.log(this.hasfollowing);
    console.log(this.hasfollowers);   
    }, 1000);
  }
 
  
 async  getuserfollowing(){
    const user = this.afAuth.auth.currentUser.uid;
    const dbref = this.data.database.ref('/following/');
    const snap = await dbref.once('value');           
    if (snap.child(user).exists()) {
      const notify = snap.child(user).val();
             this.following = (Object.values(notify)).reverse();
     console.log('following');
      console.log(this.following);
      this.hasfollowing=this.following.length!=0?true:false;
      console.log(this.hasfollowing);
    }
  }

  getstats() {
    console.log('getstats');
    let taskid = [];
    let folowingid = [];
    this.tasks.map(task => {
      taskid.push(task.id);
    });
    this.following.map(foll => {
      folowingid.push(foll.id)
    });
    taskid.map(task => {
      const test = (folowingid.includes(task));
      this.isfollowing.push(test);
    });
    console.log(this.isfollowing);
  }

  goBack() {
    this.router.navigate(['/profile'], { replaceUrl: true });
  }

  followers() {
    const databaseref = this.data.database.ref('/followers/' + this.afAuth.auth.currentUser.uid);
    databaseref.once("value", (snapshot) => {
      if(snapshot.exists()){
        snapshot.forEach(child => {
          let values = (child.val());
          this.follow.push(values);
          console.log(this.follow);
          this.tasks = this.follow;
          console.log(this.tasks.length);
         this.hasfollowers=this.tasks.length!=0? true:false;
         console.log(this.hasfollowers);
         console.log(this.tasks);
         
        })

      }
      
    })
  }

  async remove(i) {
    try {
      let user = this.afAuth.auth.currentUser.uid;
      let followerref = this.data.database.ref('/followers/' + user);
      const followerstats = await followerref.child(i).remove();
      let followingref=this.data.database.ref('/following/'+i);
      const followingstats=await followingref.child(user).remove();
      this.goBack();
      this.removebuttonclick();
    } catch (error) {
      console.log(error);
    }
  }

  async followback(i){
    console.log("followback");
    let reference1 = this.data.database.ref('/following/' + this.afAuth.auth.currentUser.uid);
    console.log(reference1);
    let followerid = i;
    let followingid = this.afAuth.auth.currentUser.uid;
    this.getuserdetails(followerid, 'following', followingid);
    this.getuserdetails(followingid, 'followers', followerid);
    this.goBack();
    this.followbackbuttonclick();
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


  doRefresh(event) {
    console.log('Begin async operation');
    this.goBack();  
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async followbackbuttonclick() {
    const toast = await this.toastController.create({
        color: 'dark',
        duration: 2000,
        message: 'User Added ',
        showCloseButton: true
      }).then(toast => {
        toast.present();
      });
    }

    async removebuttonclick() {
      const toast = await this.toastController.create({
          color: 'dark',
          duration: 2000,
          message: 'User Removed ',
          showCloseButton: true
        }).then(toast => {
          toast.present();
        });
      }
}
