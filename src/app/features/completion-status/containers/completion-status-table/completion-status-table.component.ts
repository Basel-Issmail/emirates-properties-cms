import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { merge, of as observableOf, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { CompletionStatusService } from '../../services/completion-status.service';

@Component({
  selector: 'ep-completion-status-table',
  templateUrl: './completion-status-table.component.html',
  styleUrls: ['./completion-status-table.component.scss']
})
export class CompletionStatusTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'title', 'updated_at'];
  columns = {
    cols: ['select', 'title', 'updated_at'],
    select: { isShown: true, label: '', canHide: false },
    title: { isShown: true, label: 'Title', canHide: true },
    updated_at: { isShown: true, label: 'updated at', canHide: true },
  }
  data: any[] = [];
  tab: any = 'all';
  tabs = [
    { value: 'all', label: 'All', icon: 'done_all' },
    { value: 'remind', label: 'Reminders', icon: 'alarm' },
    { value: 'draft', label: 'Drafts', icon: 'draft' },
    { value: 'delete', label: 'Deleted', icon: 'delete_outline' }]
  selectedTab = new Subject<string>();
  resultsLength = 0;
  isLoadingResults: boolean = true;
  pageSize = 30;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<any>(true, []);

  constructor(private completionStatusService: CompletionStatusService) { }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page, this.selectedTab)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.completionStatusService.getData(
            { tab: this.tab, sortCol: this.sort.active, sortDir: this.sort.direction, page: (this.paginator.pageIndex + 1), pageSize: this.pageSize });
        }),
        map(data => {
          this.isLoadingResults = false;
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
}