import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PeoplePage} from '../app/pages/people/people.page';
import { from } from 'rxjs';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
   {path: '',loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)},
   { path:'people', component:PeoplePage},
  //  { path:'profile', component:TabtwoPage}
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
