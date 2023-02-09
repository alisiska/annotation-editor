import { ComponentRef } from '@angular/core';
import { AnnotationCardComponent } from 'src/app/annotation/annotation-card/annotation-card.component';

export enum Panels {
  File = 'file',
  Annotation = 'annotation',
}

export enum AnnotationOptions {
  Text = 'text',
  Picture = 'picture',
}

export interface CanvasData {
  image: HTMLImageElement;
  canvas: any;
  ctx: CanvasRenderingContext2D;
  scale: number;
  components: Array<any>;
  annotations: Array<any>;
}

export interface AnnotationIndexes {
  annotationId: number;
  documentId: number;
}
