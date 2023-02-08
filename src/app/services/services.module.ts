import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AnnotationService } from './annotation.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [AnnotationService],
})
export class ServiceModule {}
