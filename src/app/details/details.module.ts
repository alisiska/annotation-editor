import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsRoutingModule } from './details.routing.component';
import { ServiceModule } from '../services/services.module';

@NgModule({
  imports: [CommonModule, SharedModule, DetailsRoutingModule, ServiceModule],
  declarations: [DetailsComponent],
})
export class DetailsModule {}
