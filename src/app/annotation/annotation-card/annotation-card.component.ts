import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AnnotationService } from 'src/app/services/annotation.service';
import { ResizeEvent } from 'angular-resizable-element';
import { AnnotationIndexes } from 'src/app/shared/models/shared.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-annotation-card',
  templateUrl: './annotation-card.component.html',
  styleUrls: ['./annotation-card.component.scss'],
})
export class AnnotationCardComponent implements OnInit, OnDestroy {
  public documentIndex: number;
  public annotationId: number;
  public oldX: number;
  public oldY: number;
  public dragPosition: Point = { x: 0, y: 0 };
  public currentDocumentData: any;
  public currentAnnotationData: any;
  private subscription: Subscription;
  style: {
    width: string;
    height: string;
  } = {
    width: `100px`,
    height: `100px`,
  };
  @Output() public deleteAnnotationIndex: EventEmitter<AnnotationIndexes> =
    new EventEmitter<AnnotationIndexes>();
  constructor(private annotationService: AnnotationService) {}

  ngOnInit() {
    this.currentAnnotationData = this.currentDocumentData.annotations.find(
      (annotation: any) => annotation.id === this.annotationId
    );
    this.subscription = this.annotationService
      .getAnnotationData(this.documentIndex)
      .subscribe((data: any) => {
        this.currentDocumentData = data;
        this.currentAnnotationData = data.annotations.find(
          (annotation: any) => annotation.id === this.annotationId
        );
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public drop(event: CdkDragEnd<any>): void {
    console.log(event);
    this.oldX = this.currentAnnotationData.positionX;
    this.oldY = this.currentAnnotationData.positionY;
    this.currentAnnotationData.positionX += event.distance.x;
    this.currentAnnotationData.positionY += event.distance.y;
    this.annotationService.setAnnotationData(
      this.documentIndex,
      this.currentDocumentData
    );
    this.resetPosition();
  }

  public onResizeEnd(event: ResizeEvent): void {
    let edgeTop = event.edges.top ?? 0;
    let edgeLeft = event.edges.left ?? 0;
    this.style.width = `${event.rectangle.width}px`;
    this.style.height = `${event.rectangle.height}px`;
    console.log('Element was resized', event);
    this.rollbackDropEvent(edgeTop, edgeLeft);
  }

  public deleteAnnotation() {
    this.deleteAnnotationIndex.emit({
      annotationId: this.annotationId,
      documentId: this.documentIndex,
    });
  }

  private resetPosition(): void {
    this.dragPosition = { x: 0, y: 0 };
  }

  private rollbackDropEvent(edgeTop: any, edgeLeft: any): void {
    this.currentAnnotationData.positionX = this.oldX + edgeLeft;
    this.currentAnnotationData.positionY = this.oldY + edgeTop;
    this.annotationService.setAnnotationData(
      this.documentIndex,
      this.currentDocumentData
    );
  }
}
