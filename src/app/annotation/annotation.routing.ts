import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnotationComponent } from './annotation.component';

const routes: Routes = [
  {
    path: ':id',
    component: AnnotationComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AnnotationRoutingModule {}
