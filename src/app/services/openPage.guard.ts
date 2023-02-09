import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AnnotationService } from './annotation.service';

@Injectable()
export class OpenDetailsGuard implements CanActivate {
  public constructor(
    private router: Router,
    private annotationService: AnnotationService
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.annotationService.getAnnotationData(0)) {
      return true;
    }
    this.router.navigate(['/'])
    return false;
  }
}
