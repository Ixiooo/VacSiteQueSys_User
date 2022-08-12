import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [
  {
    path: '',
    component: TablinksPage,
    children: [
      {
        path: 'add-to-queue',
        loadChildren: () => import('../add-to-queue/add-to-queue.module').then(m => m.AddToQueuePageModule)
      },
      {
        path: 'view-queue',
        loadChildren: () => import('../view-queue/view-queue.module').then( m => m.ViewQueuePageModule)
      },
      {
        path: '',
        redirectTo: '/tablinks/add-to-queue',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tablinks/add-to-queue',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule {}
