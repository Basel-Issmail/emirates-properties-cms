import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ep-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  @Output() logout = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
