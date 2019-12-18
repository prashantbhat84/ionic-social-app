import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabonePage } from './tabone.page';

const routes: Routes = [
  {
    path: '',
    component: TabonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabonePageRoutingModule {}
