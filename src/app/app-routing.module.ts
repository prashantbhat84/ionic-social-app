import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PeoplePage } from '../app/pages/people/people.page';
import { ProfilePage } from '../app/pages/profile/profile.page';
import { LoginPage } from '../app/pages/login/login.page';
import { SignupPage } from '../app/pages/signup/signup.page';
import { ForgotpasswordPage } from '../app/pages/forgotpassword/forgotpassword.page';
import { TabsPage} from '../app/pages/tabs/tabs.page';
import { FollowersPage} from './pages/followers/followers.page';
import {FollowingPage} from './pages/following/following.page';
import { from } from 'rxjs';
import { PostPage } from './pages/post/post.page';
import { SharePage} from './pages/share/share.page';
import { DataResolverService } from './resolver/data-resolver.service';


const routes: Routes = [

  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tabone',
        loadChildren: () => import('../app/pages/tabone/tabone.module').then(m => m.TabonePageModule)
      },
      {
        path: 'tabtwo',
        loadChildren: () => import('../app/pages/tabtwo/tabtwo.module').then(m => m.TabtwoPageModule)
      },
      {
        path: 'tabthree',
        loadChildren: () => import('../app/pages/tabthree/tabthree.module').then(m => m.TabthreePageModule)
      },
      {
        path: 'tabfour',
        loadChildren: () => import('../app/pages/tabfour/tabfour.module').then(m => m.TabfourPageModule)
      },
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'people', component: PeoplePage },
  { path: 'profile', component: ProfilePage },
  { path: 'login', component: LoginPage ,},
  { path: 'signup', component: SignupPage },
  { path: 'forgotpassword', component: ForgotpasswordPage },
  {path: 'followers', component: FollowersPage},
  {path: 'following', component: FollowingPage},
  {
    path: 'post/:id',
    resolve: {
      special: DataResolverService
    },
    component: PostPage
  },

  {
    path: 'share/:id',
    resolve: {
      special: DataResolverService
    },
    component: SharePage
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
