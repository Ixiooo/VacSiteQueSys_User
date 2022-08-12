import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddToQueuePage } from './add-to-queue.page';

const routes: Routes = [
  {
    path: '',
    component: AddToQueuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddToQueuePageRoutingModule {}
