import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, } from '@angular/router';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  importedData: any;
  posts: any;
  displayPost: any;
  displayObj: any;
  username: any;
  nopost: Boolean;
 
  constructor(public router: Router,
    public afAuth: AngularFireAuth,
    public data: AngularFireDatabase,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.importedData = this.route.snapshot.data['special'];
    }
  }
  ionViewWillEnter() {
    this.getdata();
    this.getuser();
  }

  ionViewDidEnter() { }
  async getuser() {
    const user = this.importedData.userid;
    const dbref = this.data.database.ref('/users/');
    const snap = await dbref.once('value');
    if (snap.child(user).exists()) {
      const notify = snap.child(user).val();
      this.username = notify.fullname;
    }
  }
  async getdata() {
    const user = this.importedData.userid;
    const dbref = this.data.database.ref('/posts/');
    this.nopost = false;
    const snap = await dbref.once('value');
    if (snap.child(user).exists()) {
      const notify = snap.child(user).val();
      this.posts = (Object.values(notify));
      this.displayPost = this.posts.filter(post => post.ID === this.importedData.id);
      if (this.displayPost.length === 0) {
        this.nopost = true;
      }
    }
    else {
      this.nopost =false; // no post for a purticluar user.    
    }
  }
  goBack() {
    this.router.navigate(['/tabs/tabthree'], { replaceUrl: true });
  }
  // share(i) {
  //   let id;
  //   this.displayPost.map(post=>{
  //     id=post.ID;      
  //   })
  //       let data = {
  //     id: id,
  //     userid: this.afAuth.auth.currentUser.uid
  //   }
  //   this.dataService.setData(42, data);
  //   this.router.navigateByUrl('/share/42');
  // }
}
