import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../core/services/spinner.service';

@Component({
  selector: 'ep-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

}
