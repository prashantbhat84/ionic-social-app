import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-tabfour',
  templateUrl: './tabfour.page.html',
  styleUrls: ['./tabfour.page.scss'],
})
export class TabfourPage implements OnInit {

  constructor(public router:Router) { }


  ngOnInit() {
  }

  people(){
    this.router.navigate(['/people'],{replaceUrl:true}); 
  }
  // profile(){
  //   this.router.navigate(['/profile'],{replaceUrl:true});
  // }
}
