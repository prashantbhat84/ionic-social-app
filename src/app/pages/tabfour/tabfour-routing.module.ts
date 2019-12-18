import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabfourPage } from './tabfour.page';

const routes: Routes = [
  {
    path: '',
    component: TabfourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabfourPageRoutingModule {}
