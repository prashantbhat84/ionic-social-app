import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabonePageRoutingModule } from './tabone-routing.module';

import { TabonePage } from './tabone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabonePageRoutingModule
  ],
  declarations: [TabonePage]
})
export class TabonePageModule {}
