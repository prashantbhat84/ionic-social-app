import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(public router: Router) { }
  Followers() {
    this.router.navigate(['/people'], { replaceUrl: true });
  }
  Following() {
    this.router.navigate(['/people'], { replaceUrl: true });

  }
  goBack() {
    this.router.navigate(['/tabs/tabfour'],{ replaceUrl: true });
  }
  ngOnInit() {
  }

}
