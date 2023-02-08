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
import { AnnotationOptions, CanvasData } from '../shared/models/shared.models';
import { AnnotationCardComponent } from './annotation-card/annotation-card.component';
import { ResizeEvent } from 'angular-resizable-element';

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

  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
  }
  
  public ngOnInit(): void {
    this.images = this.annotationService.getImages();
    this.getCanvas();
  }

  public addAnnotation(i: number, x: number, y: number) {
    const component: any = this.dynamic
      .get(i)
      ?.createComponent(AnnotationCardComponent);
    if (component) {
      component.instance.data = i;
      component.instance.top = y;
      component.instance.left = x;
      component.instance.currentAnnotationData = {
        image: this.canvas[i].image,
        canvas: this.canvas[i].canvas,
        ctx: this.canvas[i].ctx,
        scale: this.canvas[i].scale,
        index: i,
        annotations: [
          { type: AnnotationOptions.Picture, positionX: x, positionY: y },
        ],
      };
    }
    this.canvas[i].components.push(component);
  }

  public zoom(i: number, scale: number): void {
    this.canvas[i].scale += scale;

    let div: HTMLDivElement = document.getElementById(
      `div${i}`
    ) as HTMLDivElement;
    div.style.scale = `${this.canvas[i].scale}`;
    this.annotationService.setAnnotationData(i, {
      image: this.canvas[i].image,
      canvas: this.canvas[i].canvas,
      ctx: this.canvas[i].ctx,
      scale: this.canvas[i].scale,
      index: i,
      annotations: [],
    });
  }

  private openDialog(i: number, x: number, y: number): void {
    const dialogRef = this.dialog.open(AddAnnotationDialogComponent, {
      width: '250px',
      data: i,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.addAnnotation(i, x, y);
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
        });
        this.annotationService.initAnnotationData(i);
        this.annotationService.setAnnotationData(i, {
          image,
          canvas,
          ctx,
          scale,
          index: i,
          annotations: [],
        });
        canvas.onmousedown = (e: MouseEvent): void => {
          this.openDialog(i, e.offsetX, e.offsetY);

          console.log(e.offsetX, e.offsetY, this.canvas[i].scale);
          console.log(
            e.offsetX + e.offsetX * (1 - this.canvas[i].scale),
            e.offsetY + e.offsetY * (1 - this.canvas[i].scale),
            this.canvas[i].scale
          );
        };
      };
    });
  }
}
