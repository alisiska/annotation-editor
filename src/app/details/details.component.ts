import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AnnotationService } from '../services/annotation.service';
import { Annotation, DocumentData } from '../shared/models/shared.models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public annotations$: {
    [key: string]: BehaviorSubject<DocumentData>;
  };
  public annotationsDataArray: Array<DocumentData> = [];
  public constructor(private annotationService: AnnotationService) {}

  public ngOnInit(): void {
    this.annotations$ = this.annotationService.getAllAnnotationData();
    Object.keys(this.annotations$).forEach(element => {
        this.annotationsDataArray.push(this.annotations$[element].getValue());
    });
  }
}
