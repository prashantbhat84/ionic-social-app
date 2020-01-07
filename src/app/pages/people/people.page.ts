import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {

  constructor(public router: Router) { }

  goBack() {
    this.router.navigate(['/tabs/tabfour'],{ replaceUrl: true });
  }

  ngOnInit() {
  }

}
