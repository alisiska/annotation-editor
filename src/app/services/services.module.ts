import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AnnotationService } from './annotation.service';
import { OpenDetailsGuard } from './openPage.guard';

@NgModule({
  imports: [HttpClientModule],
  providers: [OpenDetailsGuard],
})
export class ServiceModule {}
