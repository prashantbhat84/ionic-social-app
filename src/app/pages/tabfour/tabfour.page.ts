import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-tabfour',
  templateUrl: './tabfour.page.html',
  styleUrls: ['./tabfour.page.scss'],
})
export class TabfourPage implements OnInit {

  constructor(public router: Router) { }
  people() {
    this.router.navigate(['/people'], { replaceUrl: true });
  }
  profile() {
    this.router.navigate(['/profile'], { replaceUrl: true });
  }
  logout() {
    window.localStorage.clear();
    this.router.navigate(['/login'],{replaceUrl:true});
  }
  ngOnInit() {
  }

}
