import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  employeeDetail: any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.employeeDetail = JSON.parse(sessionStorage.getItem('value'));
  }

  back() {
    this.router.navigateByUrl('/table-list')
  }

}
