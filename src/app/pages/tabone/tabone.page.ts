import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tabone',
  templateUrl: './tabone.page.html',
  styleUrls: ['./tabone.page.scss'],
})
export class TabonePage implements OnInit {

  name;
  user: any;
  followingarray: any = [];
  nofeeds: Boolean;
  targetarray: any = [];
  feeds: any = [];
  sortedfeeds: any = [];
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public data: AngularFireDatabase,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.user = this.afAuth.auth.currentUser.uid;
  }


  ionViewWillEnter() {
    this.getdetails();
    let user = this.afAuth.auth.currentUser
    let email = user.email;
    if (user.emailVerified === false) {
      user.sendEmailVerification().then(() => {
      });
      this.showAlert("Verify Email", "Please Check your Email for verification instructions")
      this.afAuth.auth
        .signOut()
        .then(() => {
          this.router.navigate(['/login'], { replaceUrl: true });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  ionViewDidEnter() {
    this.getfollowing();
    this.getfeeds();
    setTimeout(() => {
      this.sortfeeds();
    }, 2000);
    setTimeout(()=>{
      this.getPost();
    },3000);
  }
  async getPost(){

  }


  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })
    await alert.present()
  }

  share(i) {
    
   
    let data = {
    
      userid: this.sortedfeeds[i].userid,
      ownerid:this.sortedfeeds[i].ownerid,
      ownername:this.sortedfeeds[i].ownername,
      postid:this.sortedfeeds[i].postid
    }
    this.dataService.setData(42, data);
    this.router.navigateByUrl('/share/42');
  }

  getdetails() {
    let user = this.afAuth.auth.currentUser.uid;
    let dbref = this.data.database.ref('/users/' + user);
    dbref.once('value', snap => {
      this.name = snap.val().fullname;
    })
  }

  async getfeeds() {
    const dbref = this.data.database.ref('/feeds/');
    const snap = await dbref.once('value');
    if (!snap.exists()) {
      this.nofeeds = true;
    }
    else {
      this.nofeeds = false;
      this.feeds = (Object.values(snap.val()));
     
    }


  }
  async getfollowing() {
    let followingarray = [];
    const dbref = this.data.database.ref('/following/');
    const snapshot = await dbref.once('value');
    if (snapshot.child(this.user).exists()) {
      const notify = snapshot.child(this.user).val();
      followingarray = Object.values(notify);
      followingarray.map(foll => {
        this.targetarray.push(foll.id);
      });
      this.targetarray.push(this.user);
    }
  }

  async sortfeeds() {
    
    let newarray = []
    let megedarray=[];
    let post=[];
    newarray = this.feeds.filter(item => this.targetarray.includes(item.ownerid));
    
    this.sortedfeeds = newarray.reverse();
    //  get all post from  sorted feeds array
    
   let posts=[];
  
   this.sortedfeeds.map(feed=>{
  
    const dbref = this.data.database.ref('/posts/'+feed.ownerid+'/'+feed.postid);
    dbref.once('value',snap=>{
      const p1=(snap.val());
    
      const obj= Object.assign(feed,p1);
      
    })

     

          
          
        
         
// const p2=p1.filter(p=>feed.ID==p.postid)
// console.log(p2);
         
          // let obj={
          //   date1:feed.date1,
          //   ownerid:feed.ownerid,
          //   ownername:feed.ownername,
          //   postid:feed.postid,
          //   userid:feed.userid,
          //   timestamp:feed.timestamp,
          //   post:p1
          // }
          // megedarray.push(obj);
   });
   console.log(megedarray)


    // const snapshot = await dbref.once('value');
    // if (snapshot.child(this.user).exists()) {
    //   const notify = snapshot.child(this.user).val();
    //   followingarray = Object.values(notify);
    //   followingarray.map(foll => {
    //     this.targetarray.push(foll.id);
    //   });
    //   this.targetarray.push(this.user);
    // }
    


    
  
    
   
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.sortfeeds();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
}
