import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyPostPage } from './modify-post.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyPostPage
  },
  {
    path: '',
    loadComponent: () => import('../home.module').then( m => m.HomePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyPostPageRoutingModule {}
