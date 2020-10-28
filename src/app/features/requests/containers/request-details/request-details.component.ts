import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RequestsApis } from '../../requests.constants';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ep-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  request$: Observable<any>;

  constructor(private sharedCrudService: SharedCrudService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.request$ = this.sharedCrudService.getItemDetails(RequestsApis.getDetails, params.get("id"));
    });
  }
}
