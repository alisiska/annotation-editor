import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AnnotationService } from 'src/app/services/annotation.service';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-annotation-card',
  templateUrl: './annotation-card.component.html',
  styleUrls: ['./annotation-card.component.scss'],
})
export class AnnotationCardComponent implements OnInit {
  public data: number;
  public top: number;
  public left: number;
  public currentAnnotationData: any;
  style: {
    width: string;
    height: string;
  } = {
    width: `100px`,
    height: `100px`,
  };
  constructor(private annotationService: AnnotationService) {}

  ngOnInit() {
    this.annotationService
      .getAnnotationData(this.data)
      .subscribe((data: any) => {
        this.currentAnnotationData = data;
      });
  }

  public drop(event: CdkDragEnd<any>): void {
    console.log(event);
    this.currentAnnotationData.annotations[0].positionX = event.dropPoint.x;
    this.currentAnnotationData.annotations[0].positionY = event.dropPoint.y;
    this.annotationService.setAnnotationData(
      this.data,
      this.currentAnnotationData
    );
  }

  onResizeEnd(event: any): void {
    (this.style.width = `${event.rectangle.width}px`),
      (this.style.height = `${event.rectangle.height}px`);
    console.log('Element was resized', event);
  }
}
