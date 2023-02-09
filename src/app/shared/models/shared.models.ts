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
  annotations: Array<Annotation>;
}

export interface AnnotationIndexes {
  annotationId: number;
  documentId: number;
}

export interface Annotation {
  type: string;
  positionX: number;
  positionY: number;
  height: number;
  width: number;
  id: string;
  annotationText: string;
}

export interface DocumentData {
  scale: number;
  index: number;
  annotations: Array<Annotation>;
}
