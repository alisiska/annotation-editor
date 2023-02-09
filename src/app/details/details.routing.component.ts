import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenDetailsGuard } from '../services/openPage.guard';
import { DetailsComponent } from './details.component';

const routes: Routes = [
  {
    path: '',
    component: DetailsComponent,
    canActivate: [OpenDetailsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
