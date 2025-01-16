import { Routes } from '@angular/router';

import { ShellComponent } from './shared/shell/shell.component';
import { Error404Component } from './shared/error404/error404.component';
import { AboutComponent } from './pages/about/about.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'statistics',
        component: StatisticsComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/form',
        component: ProductsFormComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: '',
        redirectTo: 'statistics',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'page-not-found',
    component: Error404Component,
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full',
  },
];
