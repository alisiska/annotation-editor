import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotationComponent } from './annotation.component';
import { SharedModule } from '../shared/shared.module';
import { AnnotationRoutingModule } from './annotation.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AnnotationRoutingModule
  ],
  declarations: [AnnotationComponent]
})
export class AnnotationModule { }
