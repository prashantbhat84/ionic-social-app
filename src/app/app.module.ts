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
import { PeoplePage } from '../app/pages/people/people.page';
import { ProfilePage } from '../app/pages/profile/profile.page';
import { LoginPage } from '../app/pages/login/login.page';
import { SignupPage } from '../app/pages/signup/signup.page';
import { ForgotpasswordPage } from '../app/pages/forgotpassword/forgotpassword.page';
import { FormsModule } from '@angular/forms';
import firebaseConfig from '../environments/firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { TabsPage } from './pages/tabs/tabs.page';
import { FollowersPage } from './pages/followers/followers.page';
import { FollowingPage } from './pages/following/following.page';
import { PostPage } from './pages/post/post.page';
import { Network } from '@ionic-native/network/ngx';
import { SharePage } from './pages/share/share.page';




@NgModule({
  declarations: [AppComponent, PeoplePage, ProfilePage, LoginPage, SignupPage, ForgotpasswordPage, TabsPage, FollowersPage, FollowingPage, PostPage, SharePage],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MediaCapture,
    File,
    Media,
    Network



  ],
  bootstrap: [AppComponent, PostPage]
})
export class AppModule { }
