import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabtwoPage } from './tabtwo.page';

const routes: Routes = [
  {
    path: '',
    component: TabtwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabtwoPageRoutingModule {}
