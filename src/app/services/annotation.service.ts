import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { annotations } from './annotations.mock';

@Injectable({
  providedIn: 'root',
})
export class AnnotationService {
  private annotationData$: { [key: string]: BehaviorSubject<any> } = {};

  public getImages(): Array<HTMLImageElement> {
    let imageArray: Array<HTMLImageElement> = [];
    for (let i: number = 0; i < annotations.length; i++) {
      let image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = `data:image/png;base64,${annotations[i].file}`;
      imageArray.push(image);
    }
    return imageArray;
  }

  public setAnnotationData(i: number, param: any): void {
    this.annotationData$[i].next(param);
  }

  public initAnnotationData(i: number): void {
    this.annotationData$[i] = new BehaviorSubject(null);
  }

  public getAnnotationData(i: number): BehaviorSubject<any> {
    return this.annotationData$[i];
  }

  public getAllAnnotationData(): { [key: string]: BehaviorSubject<any> } {
    return this.annotationData$;
  }
}
