import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
constructor(public router: Router) { }
  signup() {
    this.router.navigate(['/signup'], { replaceUrl: true });
  }
  forgot() {
    this.router.navigate(['/forgotpassword'], { replaceUrl: true });
  }
  ngOnInit() {
  }


}


