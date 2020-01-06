import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PeoplePage } from '../app/pages/people/people.page';
import { ProfilePage } from '../app/pages/profile/profile.page';
import { LoginPage} from '../app/pages/login/login.page';
import { SignupPage} from '../app/pages/signup/signup.page';
import {ForgotpasswordPage} from '../app/pages/forgotpassword/forgotpassword.page';
import{ } from '../app/pages/tabs/tabs.page';
import { from } from 'rxjs';


const routes: Routes = [

  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'people', component: PeoplePage },
  { path: 'profile', component: ProfilePage },
  { path: 'login', component: LoginPage },
  { path: 'signup', component: SignupPage },
  {path : 'forgotpassword',component: ForgotpasswordPage},
  
 

  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
