import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'tablinks',
    loadChildren: () => import('./tablinks/tablinks.module').then(m => m.TablinksPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path : '',
    redirectTo : 'landing',
    pathMatch : 'full'  
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
