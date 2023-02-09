import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AnnotationService } from '../services/annotation.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public annotations$: {
    [key: string]: BehaviorSubject<any>;
  };
  testArray: any = [];
  public constructor(private annotationService: AnnotationService) {}

  public ngOnInit(): void {


    this.annotations$ = this.annotationService.getAllAnnotationData();
    Object.keys(this.annotations$).forEach(element => {
      
        this.testArray.push(this.annotations$[element].getValue() );
    });

    console.log(this.testArray);
    console.log(this.annotations$);
  }
}
