import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { merge, of as observableOf, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { PropertyTypeApis } from '../../property-type.constants';

@Component({
  selector: 'ep-property-type-table',
  templateUrl: './property-type-table.component.html',
  styleUrls: ['./property-type-table.component.scss']
})
export class PropertyTypeTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'name', 'category', 'updated_at', 'actions'];
  columns = {
    cols: ['select', 'name', 'category', 'updated_at', 'actions'],
    select: { isShown: true, label: '', canHide: false },
    name: { isShown: true, label: 'Name', canHide: true },
    category: { isShown: true, label: 'Category', canHide: true },
    updated_at: { isShown: true, label: 'updated at', canHide: true },
    actions: { isShown: true, label: '', canHide: false },
  }
  data: any[] = [];
  tab: any = 'all';
  tabs = [
    { value: 'all', label: 'All', icon: 'done_all' }]
  changedData = new Subject<any>();
  resultsLength = 0;
  isLoadingResults: boolean = true;
  pageSize = 30;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<any>(true, []);

  constructor(private sharedCrudService: SharedCrudService) { }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.changedData)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.sharedCrudService.getData(PropertyTypeApis.getData, { tab: this.tab, sortCol: this.sort.active, sortDir: this.sort.direction, page: (this.paginator.pageIndex + 1), pageSize: this.pageSize });
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

  toggleColumn(checkbox) {
    this.columns[checkbox.item].isShown = checkbox.event.checked;
    this.displayedColumns = this.columns.cols.filter(val => this.columns[val].isShown);
  }

  delete(selected) {
    this.sharedCrudService.delete(PropertyTypeApis.deleteForever, selected).subscribe(response => {
      this.changedData.next();
    })
  }

  changeStatus(selected, attribute, value) {
    this.sharedCrudService.changeAttribute(PropertyTypeApis.changeAttribute, selected, attribute, value).subscribe(response => {
      this.changedData.next();
    })
  }
}