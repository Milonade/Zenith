import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'create-post',
    loadChildren: () => import('./create-post/create-post.module').then(m => m.CreatePostPageModule)
  },
  {
    path: 'modify-post/:_id',
    loadChildren: () => import('./modify-post/modify-post.module').then(m => m.ModifyPostPageModule)
  },
  {
    path: 'post/:id',
    loadChildren: () => import('./view-post/view-post.module').then(m => m.ViewPostPageModule)
  },
  {
    path: 'modify-post',
    loadChildren: () => import('./modify-post/modify-post.module').then(m => m.ModifyPostPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
