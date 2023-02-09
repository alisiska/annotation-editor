import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AnnotationService } from 'src/app/services/annotation.service';
import { AnnotationIndexes } from 'src/app/shared/models/shared.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-annotation-card',
  templateUrl: './annotation-card.component.html',
  styleUrls: ['./annotation-card.component.scss'],
})
export class AnnotationCardComponent implements OnInit, OnDestroy {
  public annotationText: string;
  public documentIndex: number;
  public annotationId: number;
  public dragPosition: Point = { x: 0, y: 0 };
  public currentDocumentData: any;
  public currentAnnotationData: any;
  private subscription: Subscription;
  @Output() public deleteAnnotationIndex: EventEmitter<AnnotationIndexes> =
    new EventEmitter<AnnotationIndexes>();
  constructor(private annotationService: AnnotationService) {}

  public ngOnInit() {
    if (this.annotationText.length === 0) {
      this.annotationText =
        'https://kartinkof.club/uploads/posts/2022-03/1648229232_8-kartinkof-club-p-memi-s-zhivotnimi-s-nadpisyami-9.jpg';
    }
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

  public onResizeEnd(event: any): void {
    this.currentAnnotationData.width = event.newRect.width;
    this.currentAnnotationData.height = event.newRect.height;
    this.annotationService.setAnnotationData(
      this.documentIndex,
      this.currentDocumentData
    );
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
