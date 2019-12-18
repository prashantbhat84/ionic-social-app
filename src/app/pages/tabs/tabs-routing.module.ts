import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tabone',
        loadChildren: () => import('../tabone/tabone.module').then(m => m.TabonePageModule)
      },
      {
        path: 'tabtwo',
        loadChildren: () => import('../tabtwo/tabtwo.module').then(m => m.TabtwoPageModule)
      },
      {
        path: 'tabthree',
        loadChildren: () => import('../tabthree/tabthree.module').then(m => m.TabthreePageModule)
      },
      {
        path: 'tabfour',
        loadChildren: () => import('../tabfour/tabfour.module').then(m => m.TabfourPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabone',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
