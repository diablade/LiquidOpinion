import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'liquid-opinion-app';
  sideBarCollapse: boolean = false;

  onTopBtnClick($event: any) {
    this.sideBarCollapse = !this.sideBarCollapse;
  }
}
