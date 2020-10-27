import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ep-grid-columns-display-menu',
  templateUrl: './grid-columns-display-menu.component.html',
  styleUrls: ['./grid-columns-display-menu.component.scss']
})
export class GridColumnsDisplayMenuComponent implements OnInit {
  @Input() columns;
  @Output() toggleColumn = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  canHide(cols) {
    return cols.filter(val => this.columns[val].canHide);
  }
}
