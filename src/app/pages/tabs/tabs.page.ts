import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  home(){
    console.log("home");
  }
  recordings(){
    console.log("recordings");
  }
  notifications(){
    console.log("notifications");
  }
  friends(){
    console.log("friends");
  }
}
