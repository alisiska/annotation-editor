import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Panels } from '../models/shared.models';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() public showImageBar: boolean = false;
  public panelTypes: typeof Panels = Panels;
  public currentPanelType: string;

  public constructor(private router: Router) {}

  public goHome(): void {
    this.router.navigate(['/']);
  }

  public openPanel(type: string): void {
    this.currentPanelType = type;
  }

  public downloadAnnotation() {
    this.router.navigate(['annotation-details']);
  }
}
