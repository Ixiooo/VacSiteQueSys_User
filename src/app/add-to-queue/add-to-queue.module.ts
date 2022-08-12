import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; //Also import Reactive Form

import { IonicModule } from '@ionic/angular';

import { AddToQueuePageRoutingModule } from './add-to-queue-routing.module';

import { AddToQueuePage } from './add-to-queue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddToQueuePageRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [AddToQueuePage]
})
export class AddToQueuePageModule {}
