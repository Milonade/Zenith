import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: "",
        redirectTo: "account", // Or whatever tabs is your default one
        pathMatch: "full",
      },
      {
        // Route that loads the home module
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        // Route that loads the account module
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule { }
