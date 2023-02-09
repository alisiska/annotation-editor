import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnnotationService } from 'src/app/services/annotation.service';
import { AnnotationIndexes } from 'src/app/shared/models/shared.models';

@Component({
  selector: 'app-annotation-text',
  templateUrl: './annotation-text.component.html',
  styleUrls: ['./annotation-text.component.scss'],
})
export class AnnotationTextComponent implements OnInit {
  public annotationText: string;
  public documentIndex: number;
  public annotationId: number;
  public dragPosition: Point = { x: 0, y: 0 };
  public currentDocumentData: any;
  public currentAnnotationData: any;
  private subscription: Subscription;
  @Output() public deleteAnnotationIndex: EventEmitter<AnnotationIndexes> =
    new EventEmitter<AnnotationIndexes>();

  public constructor(private annotationService: AnnotationService) {}

  public ngOnInit(): void {
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

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public drop(event: CdkDragEnd<any>): void {
    this.currentAnnotationData.positionX += event.distance.x;
    this.currentAnnotationData.positionY += event.distance.y;
    this.annotationService.setAnnotationData(
      this.documentIndex,
      this.currentDocumentData
    );
    this.resetPosition();
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
}
