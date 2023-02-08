import { Component, Inject } from '@angular/core';
import { AnnotationOptions } from 'src/app/shared/models/shared.models';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-annotation-dialog',
  templateUrl: './add-annotation-dialog.component.html',
  styleUrls: ['./add-annotation-dialog.component.scss'],
})
export class AddAnnotationDialogComponent {
  public annotationOptions: typeof AnnotationOptions = AnnotationOptions;
  public selectedValue: string = this.annotationOptions.Picture;
  constructor(
    @Inject(MAT_DIALOG_DATA) public id: string,
    public dialogRef: MatDialogRef<AddAnnotationDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
