import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotationComponent } from './annotation.component';
import { SharedModule } from '../shared/shared.module';
import { AnnotationRoutingModule } from './annotation.routing';
import { ServiceModule } from '../services/services.module';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AddAnnotationDialogComponent } from './add-annotation-dialog/add-annotation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AnnotationCardComponent } from './annotation-card/annotation-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ResizableModule } from 'angular-resizable-element';
import { AnnotationTextComponent } from './annotation-text/annotation-text.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AnnotationRoutingModule,
    ServiceModule,
    NgxImageZoomModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    DragDropModule,
    ResizableModule,
  ],
  declarations: [
    AnnotationComponent,
    AddAnnotationDialogComponent,
    AnnotationCardComponent,
    AnnotationTextComponent,
  ],
  entryComponents: [AnnotationCardComponent],
})
export class AnnotationModule {}
