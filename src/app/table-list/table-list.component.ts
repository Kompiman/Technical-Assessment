import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { EmployeeContent, ELEMENT_DATA } from "./table-content";
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { filterData, SearchType } from 'filter-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements AfterViewInit {
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    ) { }
  displayedColumns: string[] = ['firstName', 'status', 'group', 'action'];
  dataSource = new MatTableDataSource<EmployeeContent>(ELEMENT_DATA);
  employeeList = ELEMENT_DATA;
  searchField: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    if (sessionStorage.getItem('toViewPage') === 'true') {
      if (sessionStorage.getItem('search') !== 'undefined') {
        this.searchField = sessionStorage.getItem('search');
        this.applySearch(this.searchField)
      }
      this.paginator.pageIndex = parseInt(sessionStorage.getItem('page'));
      sessionStorage.setItem('toViewPage', 'false');
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit() {
    
  }

  addEmployee() {
    sessionStorage.setItem('page', this.dataSource.paginator.pageIndex.toString());
    sessionStorage.setItem('search', this.searchField);
    this.router.navigateByUrl("/add-employee");
  }

  viewData(element) {
    sessionStorage.setItem('page', this.dataSource.paginator.pageIndex.toString());
    sessionStorage.setItem('search', this.searchField);
    sessionStorage.setItem('value', JSON.stringify(element));
    sessionStorage.setItem('toViewPage', 'true');
    
    this.router.navigateByUrl("/view-employee");
  }

  applySearch(value: string) {
    this.dataSource.data = this.employeeList;
    // const filterValue = (event.target as HTMLInputElement).value;
    let words = [];
    words = value.toString().split(" ");
    words.map((word) => {
      this.searchFunction(word);
    });
  }

  searchFunction(word: string) {
    this.dataSource.filter = word.trim().toLowerCase();
    this.dataSource.data = this.dataSource.filteredData;
    // if (word) {
    //   this.dataSource.paginator.pageIndex = 0
    // }
  }

  resetFilter() {
    this.dataSource.filter = ""
    this.searchField = ""
    this.dataSource.data = this.employeeList;
  }

}

