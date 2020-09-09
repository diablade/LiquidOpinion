import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Output() btnClick = new EventEmitter();
  faBars = faBars;

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick(id: string) {
    console.log(id);
    this.btnClick.emit(id);
  }
}
