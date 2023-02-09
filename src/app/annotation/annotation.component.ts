import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { AnnotationService } from '../services/annotation.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAnnotationDialogComponent } from './add-annotation-dialog/add-annotation-dialog.component';
import {
  AnnotationIndexes,
  AnnotationOptions,
  CanvasData,
  DocumentData,
} from '../shared/models/shared.models';
import { AnnotationCardComponent } from './annotation-card/annotation-card.component';
import { AnnotationTextComponent } from './annotation-text/annotation-text.component';
import { v1 as uuidv1 } from 'uuid';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss'],
})
export class AnnotationComponent implements OnInit {
  public image: HTMLImageElement;
  public ctx: CanvasRenderingContext2D;
  public canvas: Array<CanvasData> = [];
  public images: Array<HTMLImageElement> = [];
  @ViewChildren('dynamic', { read: ViewContainerRef })
  private dynamic: QueryList<ViewContainerRef>;

  public constructor(
    private annotationService: AnnotationService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.images = this.annotationService.getImages();
    this.getCanvas();
  }

  public addAnnotation(
    i: number,
    x: number,
    y: number,
    dialogData: { annotationText: string; type: string }
  ) {
    const annotationId: string = uuidv1();
    let newItemData: DocumentData = {
      scale: this.canvas[i].scale,
      index: i,
      annotations: [
        ...this.canvas[i].annotations,
        ...[
          {
            type: dialogData.type,
            positionX: x,
            positionY: y,
            height: 200,
            width: 200,
            id: annotationId,
            annotationText: dialogData.annotationText ?? '',
          },
        ],
      ],
    };
    let component: any;
    if (dialogData.type === AnnotationOptions.Picture) {
      component = this.dynamic.get(i)?.createComponent(AnnotationCardComponent);
    } else {
      component = this.dynamic.get(i)?.createComponent(AnnotationTextComponent);
      
    }

    if (component) {
      component.instance.deleteAnnotationIndex.subscribe(
        (value: AnnotationIndexes) => {
          this.deleteAnnotation(value);
        }
      );
      component.instance.annotationText = dialogData.annotationText;
      component.instance.documentIndex = i;
      component.instance.annotationId = annotationId;
      component.instance.top = y;
      component.instance.left = x;
      component.instance.currentDocumentData = newItemData;
      this.annotationService.setAnnotationData(i, newItemData);
      this.canvas[i].annotations = newItemData.annotations;
      this.canvas[i].components.push(component);
    }
  }

  public zoom(i: number, scale: number): void {
    this.canvas[i].scale += scale;

    let div: HTMLDivElement = document.getElementById(
      `div${i}`
    ) as HTMLDivElement;
    div.style.scale = `${this.canvas[i].scale}`;
    this.annotationService.setAnnotationData(i, {
      scale: this.canvas[i].scale,
      index: i,
      annotations: this.canvas[i].annotations,
    });
  }

  private deleteAnnotation(indexes: AnnotationIndexes) {
    this.canvas[indexes.documentId].components
      .find(
        (component) => component.instance.annotationId === indexes.annotationId
      )
      .destroy();
    this.canvas[indexes.documentId].annotations = this.canvas[
      indexes.documentId
    ].annotations.filter(
      (annotation: any) => annotation.id != indexes.annotationId
    );
    let newItemData = {
      canvas: this.canvas[indexes.documentId].canvas,
      scale: this.canvas[indexes.documentId].scale,
      index: indexes.documentId,
      annotations: this.canvas[indexes.documentId].annotations,
    };
    this.annotationService.setAnnotationData(indexes.documentId, newItemData);
  }

  private openDialog(i: number, x: number, y: number): void {
    const dialogRef = this.dialog.open(AddAnnotationDialogComponent, {
      width: '350px',
      data: i,
    });
    dialogRef
      .afterClosed()
      .subscribe((result: { annotationText: string; type: string }) => {
        if (result) {
          this.addAnnotation(i, x, y, result);
        }
      });
  }

  public getCanvas(): void {
    this.images.forEach((image: HTMLImageElement, i: number) => {
      this.images[i].onload = (): void => {
        let image: HTMLImageElement = this.images[i];
        let canvas: any = document.getElementById(`canvas${i}`);
        let div: any = document.getElementById(`div${i}`);
        div.style.width = image.width + 'px';
        div.style.maxWidth = image.width + 'px';
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        let scale: number = 1;
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.scale(scale, scale);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        this.canvas.push({
          image,
          canvas,
          ctx,
          scale,
          components: [],
          annotations: [],
        });
        this.annotationService.initAnnotationData(i);
        this.annotationService.setAnnotationData(i, {
          scale,
          index: i,
          annotations: [],
        });
        canvas.onmousedown = (e: MouseEvent): void => {
          this.openDialog(i, e.offsetX, e.offsetY);
        };
      };
    });
  }
}
