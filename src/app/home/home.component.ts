import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public id: string;

  public constructor() {}

  public ngOnInit() {
    this.id = this.getId();
  }

  private getId(): string {
    return '12345';
  }
}
