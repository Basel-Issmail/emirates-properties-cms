import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridTabs } from './grid-tabs.constants';

@Component({
  selector: 'ep-grid-tabs',
  templateUrl: './grid-tabs.component.html',
  styleUrls: ['./grid-tabs.component.scss']
})
export class GridTabsComponent implements OnInit {
  @Input() tabs: GridTabs;
  @Input() activeTab: string = '';
  @Output() selectedTab = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  changeActiveTab(value) {
    this.selectedTab.emit(value);
  }

}
