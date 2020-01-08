import { Component, OnInit } from '@angular/core';
// import {
//   MediaCapture,
//   MediaFile,
//   CaptureError
// } from '@ionic-native/media-capture/ngx';
import { ActionSheetController, Platform, NavController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import{ BehaviorSubject} from 'rxjs';
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
  urlarray:any[]=[];
  tasks:any;

  constructor(
    private platform: Platform,
    private file: File,
    private media: Media,
    public navctrl :NavController,
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public store: AngularFireStorage,
    public data : AngularFireDatabase,
  

  ) { }



  ngOnInit(){}

  ionViewWillEnter(){
 
    this.getAudioList();
  }
  

  startTimer(duration:number){
      this.state = 'start';
      clearInterval(this.interval);
      this.timer = duration* 60;
      this.interval = setInterval( () => {
        this.updateTimeValue();
      }, 1000);
     
    }
  
    stopTimer(){
       clearInterval(this.interval);
       this.time.next('00:00');
       this.state = 'stop';
      
    }
    
  updateTimeValue(){
    let minutes:any = this.timer / 60;
    let seconds:any = this.timer % 60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const text = minutes + ':' + seconds;
    this.time.next(text);
 
    --this.timer;

    if(this.timer<0){
      this.startTimer(1)
    }
  }
  
//method two
  startRecord() {

    if (this.platform.is('ios')) {
      this.fileName = 'Record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'Record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    let file=this.filePath
    this.startTimer(1);
    this.audio.startRecord();
    this.recording = true;
  }

  async getAudioList() {
    // window.location.reload(true);
    let userid = this.afAuth.auth.currentUser.uid;
    let audioList = [];
    const rootref = this.data.database.ref();
    const urlref = rootref.child('/audio/' + userid);
    let darray = [];
    urlref.once("value", (snapshot) => {
      snapshot.forEach(child => {
        let values = (child.val());
        this.urlarray.push(values);
        this.tasks = Object.values(this.urlarray);
        

      })
    })
  }

 
  stopRecord() {
    this.audio.stopRecord();
    // let data = { filename: this.fileName };
    // this.audioList.push(data);
    // localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    let data = { filename: this.fileName};
    let file=[];
    file.push(data);
    let dt = new Date();
    let fileid = (Math.random());
    // let userid="aqwer" 
   let userid = this.afAuth.auth.currentUser.uid;
      let storageRef= this.store.storage.ref();
      let audioRef= storageRef.child('audiofiles'+fileid);
      let newAudioBlob= new Blob(file,{type:'.mp3'});
      const task=audioRef.put(newAudioBlob,{contentType:'audio/mp3'});
      task.then(snapshot=>snapshot.ref.getDownloadURL()).then(url=>{
           const dbref= this.data.database.ref('/audio/'+userid).push(fileid).set({fileurl:url,name:fileid})
      }).catch(error=>{
        alert('error in storage');
        alert(error);
      })
      this.tasks=[];

    this.getAudioList();
    this.stopTimer();
  }
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



