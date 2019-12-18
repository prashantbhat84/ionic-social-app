import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabtwoPageRoutingModule } from './tabtwo-routing.module';

import { TabtwoPage } from './tabtwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabtwoPageRoutingModule
  ],
  declarations: [TabtwoPage]
})
export class TabtwoPageModule {}
