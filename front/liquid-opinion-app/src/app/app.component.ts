import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'liquid-opinion-app';
  sideBarCollapsed: boolean = false;

  onTopBtnClick(event: any) {
    if (event == 'collapse') {
      this.sideBarCollapsed = !this.sideBarCollapsed;
    }
  }
}
