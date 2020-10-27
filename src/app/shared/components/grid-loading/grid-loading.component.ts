import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ep-grid-loading',
  templateUrl: './grid-loading.component.html',
  styleUrls: ['./grid-loading.component.scss']
})
export class GridLoadingComponent implements OnInit {
  @Input() isLoadingResults = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
