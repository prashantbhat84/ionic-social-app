import { Component, OnInit } from '@angular/core';
import {
  MediaCapture,
  MediaFile,
  CaptureError
} from '@ionic-native/media-capture/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import{ BehaviorSubject} from 'rxjs';

const MEDIA_FOLDER_NAME = 'my_media';


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

  constructor(
    private platform: Platform,
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private actionSheetController: ActionSheetController,
  ) { }

  // method one
  ionViewWillEnter() {
    this.getAudioList();
  }

  // ngOnInit() {
  //   this.platform.ready().then(() => {
  //     let path = this.file.dataDirectory;
  //     this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
  //       () => {
  //         this.loadFiles();
  //       },
  //       err => {
  //         this.file.createDir(path, MEDIA_FOLDER_NAME, false);
  //       }
  //     );
  //   });
  // }
 
  // loadFiles() {
  //   this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(
  //     res => {
  //       this.files = res;
  //     },
  //     err => console.log('error loading files: ', err)
  //   );
  // }


  // async selectMedia(){
  //   const actionSheet= await this.actionSheetController.create({
  //     buttons :[
  //       {
  //         text: 'Record Audio',
  //         handler: () => {
  //           this.recordAudio();
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //       role: 'cancel'
  //     }
  //     ]
  //   });
  //   await actionSheet.present();
  // }

  // recordAudio(){
  //   this.mediaCapture.captureAudio().then(
  //     (data:MediaFile[])=>{
  //       if(data.length>0){
  //         this.copyFileToLocalDir(data[0].fullPath);
  //       }
  //     },
  //     (err: CaptureError) => console.log(err)
  //   );
  // }

  // copyFileToLocalDir(fullPath) {
  //   let myPath = fullPath;
  //   if (fullPath.indexOf('file://')<0){
  //     myPath = 'file://'+ fullPath;
  //   }
  //   const ext = myPath.split('.').pop();
  //   const d = Date.now();
  //   const newName = `${d}.${ext}`;

  //   const name = myPath.substr(myPath.lastIndexOf('/') + 1);
  //   const copyFrom = myPath.substr(0,myPath.lastIndexOf('/')+1);
  //   const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;

  //   this.file.copyFile(copyFrom,name,copyTo,newName).then(
  //     success =>{
  //       this.loadFiles();
  //     },
  //     error => {
  //       console.log('error: ', error);
  //     }
  //   );
  // }

  // openFile(f: FileEntry){
  //     const path = f.nativeURL.replace(/^file:\/\//,'');
  //     const audioFile : MediaObject = this.media.create(path);
  //     audioFile.play();
  // }

  // deleteFile(f: FileEntry){
  //     const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/')+ 1);
  //     this.file.removeFile(path, f.name).then(()=>{
  //       this.loadFiles();
  //     }, err => console.log('error remove: ', err));
  // }

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
    this.startTimer(1);
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
    this.stopTimer();
  }

  getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
      
    }
  }

  playAudio(file, idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
    this.playing = true;
  }

  stopAudio() {
    this.audio.stop();
    this.playing = false;
  }

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

  //timer

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
  

}


