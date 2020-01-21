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
  tasks: any = [];
  following: any = [];
  stats: any = [];

  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public store: AngularFireStorage,
    public data: AngularFireDatabase, ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.followers();
  }
  getstats() {
    let smallerarray: any = [];
    let largerarray: any = [];
    console.log(this.tasks);
    console.log(this.following);
  }
  getFollowing() {
    let test: any[] = []
    const databaseref = this.data.database.ref('/following/' + this.afAuth.auth.currentUser.uid);
    databaseref.once("value", (snapshot) => {
      snapshot.forEach(child => {
        let values = (child.val());
        test.push(values);
        //console.log(test); 
        test.map(t1 => {
          this.following.push(t1.id);
        })
        this.getstats();

      })
    });
  }

  goBack() {
    this.router.navigate(['/profile'], { replaceUrl: true });
  }

  followers() {
    const databaseref = this.data.database.ref('/followers/' + this.afAuth.auth.currentUser.uid);
    databaseref.once("value", (snapshot) => {
      snapshot.forEach(child => {
        let values = (child.val());
        this.follow.push(values);
        console.log(this.follow);
        this.tasks = this.follow;
        console.log(this.tasks);
      })
    })
  }

  async remove(i) {
    try {
      let user = this.afAuth.auth.currentUser.uid;
      let followerref = this.data.database.ref('/followers/' + user);
      const followerstats = await followerref.child(i).remove();
      this.goBack();
    } catch (error) {
      console.log(error);
    }

  }

  //   async getfreinds(){
  //     console.log('get fre');
  // let array1=[],array2=[];
  //     const user=this.afAuth.auth.currentUser.uid;
  //     const dbref= this.data.database.ref('/followers/'+user);
  //        const snap= await dbref.once('value');
  //          console.log(snap.exists());
  //            console.log(snap.key);

  // if(dbref!==null){
  //       const foll= await dbref.once('value');
  // const foll1=(Object.values(foll.val()));
  //         foll1.map(f=>{
  //           array1.push(f);
  //         });
  //       //console.log(array1);
  //       array1.map(arr=>{
  //         // this.tasks.push(arr.id);
  //       console.log(arr.id);
  //       });
  //     }
  //     else{
  //       console.log('null');
  //     }  
  // }
  // if(this.tasks.length>this.following.length){
  //   largerarray=this.tasks;
  //   smallerarray=this.following;

  // }
  // else{
  //   largerarray=this.following;
  //   smallerarray=this.tasks;
  // }
  // console.log(smallerarray);
  // console.log(largerarray);
  // for(let i=0; i<largerarray.length;i++){
  // this.stats[i]=(smallerarray.includes(largerarray[i]));
  // }
  // console.log(this.stats);
}
