import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabthreePage } from './tabthree.page';

const routes: Routes = [
  {
    path: '',
    component: TabthreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabthreePageRoutingModule {}
