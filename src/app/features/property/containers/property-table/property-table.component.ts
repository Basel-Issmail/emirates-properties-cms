import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { merge, of as observableOf, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { PropertyApis } from '../../property.constants';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Component({
  selector: 'ep-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PropertyTableComponent implements AfterViewInit {
  imageBaseUrl = environment.imageBaseUrl;
  expandedElement: any | null;
  displayedColumns: string[] = ['select', 'status', 'reference', 'purpose', 'price', 'published_by', 'actions'];
  columns = {
    cols: ['select', 'status', 'reference', 'purpose', 'price', 'published_by', 'actions'],
    select: { isShown: true, label: '', canHide: false },
    status: { isShown: true, label: '', canHide: false },
    reference: { isShown: true, label: 'Reference', canHide: true },
    purpose: { isShown: true, label: 'Purpose', canHide: true },
    price: { isShown: true, label: 'Price', canHide: true },
    published_by: { isShown: true, label: 'Published by', canHide: true },
    actions: { isShown: true, label: '', canHide: false },
  }
  data: any[] = [];
  tab: any = 'approved';
  tabs = [
    { value: 'approved', label: 'Approved', icon: 'done_all' },
    { value: 'pending_approval', label: 'Pending Approval', icon: 'alarm' },
    { value: 'draft', label: 'Drafts', icon: 'drafts' },
    { value: 'delete', label: 'Deleted', icon: 'delete_outline' }]
  selectedTab = new Subject<string>();
  changedData = new Subject<any>();
  resultsLength = 0;
  isLoadingResults: boolean = true;
  pageSize = 30;
  purposeObj: any = {};
  cityObj: any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<any>(true, []);

  constructor(private sharedCrudService: SharedCrudService, private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.route.snapshot.data.buidler.purpose_list.forEach(element => {
      this.purposeObj[element.id] = element.name;
    });
    this.route.snapshot.data.buidler.city_list.forEach(element => {
      this.cityObj[element.id] = element.name;
    });
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.selectedTab, this.changedData)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.sharedCrudService.getData(PropertyApis.getData, { tab: this.tab, sortCol: this.sort.active, sortDir: this.sort.direction, page: (this.paginator.pageIndex + 1), pageSize: this.pageSize });
        }),
        map(data => {
          this.isLoadingResults = false;
          this.selection.clear();
          this.resultsLength = data.total;
          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.forEach(row => this.selection.select(row));
  }

  setActiveTab(tab) {
    this.tab = tab;
    this.selectedTab.next(tab);
  }

  toggleColumn(checkbox) {
    this.columns[checkbox.item].isShown = checkbox.event.checked;
    this.displayedColumns = this.columns.cols.filter(val => this.columns[val].isShown);
  }

  delete(selected) {
    this.sharedCrudService.delete(PropertyApis.delete, selected).subscribe(response => {
      this.changedData.next();
    })
  }

  deleteDraft(selected) {
    this.sharedCrudService.delete(PropertyApis.deleteDraft, selected).subscribe(response => {
      this.changedData.next();
    })
  }

  deleteForever(selected) {
    this.sharedCrudService.delete(PropertyApis.deleteForever, selected).subscribe(response => {
      this.changedData.next();
    })
  }

  changeStatus(selected, attribute, value) {
    this.sharedCrudService.changeAttribute(PropertyApis.changeAttribute, selected, attribute, value).subscribe(response => {
      this.changedData.next();
    })
  }

  restore(selected) {
    this.sharedCrudService.restore(PropertyApis.restore, selected).subscribe(response => {
      this.changedData.next();
    })
  }

  approve(selected) {
    this.sharedCrudService.postRequest(PropertyApis.approve, selected, 'Approved successfully').subscribe(response => {
      this.changedData.next();
    })
  }

  disapprove(selected) {
    alert('No API Yet');
    // this.sharedCrudService.postRequest(PropertyApis.approve, selected).subscribe(response => {
    //   this.changedData.next();
    // })
  }

  isExpiredDate(date){
    return moment().isAfter(date)? '#d2001b': 'black'; 
  }
}