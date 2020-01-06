import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public router: Router) { }

  login() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  ngOnInit() {
  }
}
