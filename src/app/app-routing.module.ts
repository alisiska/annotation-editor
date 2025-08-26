/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Repositories:
*     - repo: https://github.com/angular/angular-bazel-example release version: master-2f1abb9  asset relative path: src/app/app-routing.module.ts
*    
*    Copyrights:
*     - copyright (c) 2014-2017 google, inc. http://angular.io
*    
*    Licenses:
*     - MIT License
*       SPDXId: MIT
*    
*    Auto-attribution by Threatrix, Inc.
*    
*    ------ END LICENSE ATTRIBUTION ------
*/
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), //tslint:disable-line
  },
  {
    path: 'annotation',
    loadChildren: () => import('./annotation/annotation.module').then((m) => m.AnnotationModule), //tslint:disable-line
  },
  {
    path: 'annotation-details',
    loadChildren: () => import('./details/details.module').then((m) => m.DetailsModule), //tslint:disable-line
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
