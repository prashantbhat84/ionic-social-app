import { Component, OnInit } from '@angular/core';
// import {
//   MediaCapture,
//   MediaFile,
//   CaptureError
// } from '@ionic-native/media-capture/ngx';
import { ActionSheetController, Platform, NavController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { FirebaseApp } from '@angular/fire';


// const MEDIA_FOLDER_NAME = 'my_media';


@Component({
  selector: 'app-tabtwo',
  templateUrl: './tabtwo.page.html',
  styleUrls: ['./tabtwo.page.scss'],
})

export class TabtwoPage {

  text: string = "";
  files = [];
  Timer;
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timer: number;
  interval;
  state: 'start' | 'stop' = 'stop';


  //method one
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  playing: boolean = false;
  urlarray: any[] = [];
  tasks: any;
  followerslist: any[] = []

  constructor(
    private platform: Platform,
    private file: File,
    private media: Media,
    public navctrl: NavController,
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public store: AngularFireStorage,
    public data: AngularFireDatabase,


  ) { }



  ngOnInit() {
    this.getFollowers();
  }

  ionViewWillEnter() {
    this.getFollowers();
  }

  async getFollowers() {
    const user = this.afAuth.auth.currentUser.uid;
    const dbref = this.data.database.ref('/followers/' + user);
    const snapshot = await dbref.once('value');

    this.followerslist = (Object.keys(snapshot.val()));




  }
  async savePost(post) {
    const user = this.afAuth.auth.currentUser.uid;
    const dbref = this.data.database.ref();
    const dbpost = dbref.child('/posts/' + user);
    const dbname = dbref.child('/users/' + user);
    const snap = await dbname.once('value');
    const name = snap.val().fullname;
    let dt = new Date();
    // console.log(this.time_ago(new Date(Date.now() -this.times);
    const rand= Math.random();
     const dt1= Date.now();
     const ID=Math.round(rand + dt1);
  
    dbpost.push({
      post,
      date1: dt.getDate() + '/' + dt.getMonth() + 1 + '/' + dt.getFullYear(),
      timestamp: dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds(),
      ID
    });
    const dbfeed = dbref.child('/feeds/');
    dbfeed.push({
      id: user,
      post,
      date1: dt.getDate() + '/' + dt.getMonth() + 1 + '/' + dt.getFullYear(),
      timestamp: dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()

    });
    this.followerslist.map(follower => {
      const notref = dbref.child('/notifications/' + follower);
      notref.push({
        name,
        date1: dt.getDate() + '/' + dt.getMonth() + 1 + '/' + dt.getFullYear(),
        timestamp: dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds(),
        ID,
        userid:user,
        action:'added'
      })
    })
   
    const loading = document.createElement('ion-loading');
    loading.message= 'Uploading';
    loading.duration= 2000;  
    document.body.appendChild(loading);
    await loading.present();  
    const { role, data } = await loading.onDidDismiss();
    this.text= "";
    

  }

  //  time_ago(time) {

  //   switch (typeof time) {
  //     case 'number':
  //       break;
  //     case 'string':
  //       time = +new Date(time);
  //       break;
  //     case 'object':
  //       if (time.constructor === Date) time = time.getTime();
  //       break;
  //     default:
  //       time = +new Date();
  //   }
  //   var time_formats = [
  //     [60, 'seconds', 1], // 60
  //     [120, '1 minute ago', '1 minute from now'], // 60*2
  //     [3600, 'minutes', 60], // 60*60, 60
  //     [7200, '1 hour ago', '1 hour from now'], // 60*60*2
  //     [86400, 'hours', 3600], // 60*60*24, 60*60
  //     [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
  //     [604800, 'days', 86400], // 60*60*24*7, 60*60*24
  //     [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
  //     [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
  //     [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
  //     [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
  //     [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
  //     [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
  //     [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
  //     [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  //   ];
  //   var seconds = (+new Date() - time) / 1000,
  //     token = 'ago',
  //     list_choice = 1;

  //   if (seconds == 0) {
  //     return 'Just now'
  //   }
  //   if (seconds < 0) {
  //     seconds = Math.abs(seconds);
  //     token = 'from now';
  //     list_choice = 2;
  //   }
  //   var i = 0,
  //     format;
  //   while (format = time_formats[i++])
  //     if (seconds < format[0]) {
  //       if (typeof format[2] == 'string')
  //         return format[list_choice];
  //       else
  //         return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
  //     }
  //   return time;
  // }

  // var aDay = 24 * 60 * 60 * 1000;
  // console.log(time_ago(new Date(Date.now() - aDay)));
  // console.log(time_ago(new Date(Date.now() - aDay * 10)));
  // console.log(time_ago(new Date(Date.now())));


  //   startTimer(duration:number){
  //       this.state = 'start';
  //       clearInterval(this.interval);
  //       this.timer = duration* 60;
  //       this.interval = setInterval( () => {
  //         this.updateTimeValue();
  //       }, 1000);

  //     }

  //     stopTimer(){
  //        clearInterval(this.interval);
  //        this.time.next('00:00');
  //        this.state = 'stop';

  //     }

  //   updateTimeValue(){
  //     let minutes:any = this.timer / 60;
  //     let seconds:any = this.timer % 60;

  //     minutes = String('0' + Math.floor(minutes)).slice(-2);
  //     seconds = String('0' + Math.floor(seconds)).slice(-2);

  //     const text = minutes + ':' + seconds;
  //     this.time.next(text);

  //     --this.timer;

  //     if(this.timer<0){
  //       this.startTimer(1)
  //     }
  //   }

  // //method two
  //   startRecord() {

  //     if (this.platform.is('ios')) {
  //       this.fileName = 'Record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
  //       this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
  //       this.audio = this.media.create(this.filePath);
  //     } else if (this.platform.is('android')) {
  //       this.fileName = 'Record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
  //       this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
  //       this.audio = this.media.create(this.filePath);
  //     }
  //     let file=this.filePath
  //     this.startTimer(1);
  //     this.audio.startRecord();
  //     this.recording = true;
  //   }

  //   async getAudioList() {
  //     // window.location.reload(true);
  //     let userid = this.afAuth.auth.currentUser.uid;
  //     let audioList = [];
  //     const rootref = this.data.database.ref();
  //     const urlref = rootref.child('/audio/' + userid);
  //     let darray = [];
  //     urlref.once("value", (snapshot) => {
  //       snapshot.forEach(child => {
  //         let values = (child.val());
  //         this.urlarray.push(values);
  //         this.tasks = Object.values(this.urlarray);


  //       })
  //     })
  //   }


  //   stopRecord() {
  //     this.audio.stopRecord();
  //     // let data = { filename: this.fileName };
  //     // this.audioList.push(data);
  //     // localStorage.setItem("audiolist", JSON.stringify(this.audioList));
  //     this.recording = false;
  //     let data = { filename: this.fileName};
  //     let file=[];
  //     file.push(data);
  //     let dt = new Date();
  //     let fileid = (Math.random());
  //     // let userid="aqwer" 
  //    let userid = this.afAuth.auth.currentUser.uid;
  //       let storageRef= this.store.storage.ref();
  //       let audioRef= storageRef.child('audiofiles'+fileid);
  //       let newAudioBlob= new Blob(file,{type:'.mp3'});
  //       const task=audioRef.put(newAudioBlob,{contentType:'audio/mp3'});
  //       task.then(snapshot=>snapshot.ref.getDownloadURL()).then(url=>{
  //            const dbref= this.data.database.ref('/audio/'+userid).push(fileid).set({fileurl:url,name:fileid})
  //       }).catch(error=>{
  //         alert('error in storage');
  //         alert(error);
  //       })
  //       this.tasks=[];

  //     this.getAudioList();
  //     this.stopTimer();
  //   }
}



  // playAudio(file, idx) {
  //   if (this.platform.is('ios')) {
  //     this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
  //     this.audio = this.media.create(this.filePath);
  //   } else if (this.platform.is('android')) {
  //     this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
  //     this.audio = this.media.create(this.filePath);
  //   }
  //   this.audio.play();
  //   this.audio.setVolume(0.8);
  //   this.playing = true;
  // }

  // stopAudio() {
  //   this.audio.stop();
  //   this.playing = false;
  // }

  // audios(fileName,i){
  //   alert(this.playing);
  //   !this.playing;
  //   // alert(this.playing);
  //   if(this.playing){
  //     this.stopAudio();
  //   } else {
  //     this.playAudio(fileName, i)
  //   }
  // }



