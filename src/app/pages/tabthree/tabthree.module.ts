import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabthreePageRoutingModule } from './tabthree-routing.module';

import { TabthreePage } from './tabthree.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabthreePageRoutingModule
  ],
  declarations: [TabthreePage]
})
export class TabthreePageModule {}
