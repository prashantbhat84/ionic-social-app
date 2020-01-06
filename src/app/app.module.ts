import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { File } from '@ionic-native/File/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { PeoplePage} from '../app/pages/people/people.page';
import { ProfilePage} from '../app/pages/profile/profile.page';
import { LoginPage} from '../app/pages/login/login.page';
import { SignupPage} from '../app/pages/signup/signup.page';
import {ForgotpasswordPage} from '../app/pages/forgotpassword/forgotpassword.page';

@NgModule({
  declarations: [AppComponent,PeoplePage,ProfilePage,LoginPage,SignupPage,ForgotpasswordPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MediaCapture,
    File,
    Media,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
