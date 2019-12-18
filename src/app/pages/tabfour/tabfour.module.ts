import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabfourPageRoutingModule } from './tabfour-routing.module';

import { TabfourPage } from './tabfour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabfourPageRoutingModule
  ],
  declarations: [TabfourPage]
})
export class TabfourPageModule {}
