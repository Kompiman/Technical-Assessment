import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { groupList, statusList } from "./dataList";
import { startWith, debounceTime, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MyErrorStateMatcher } from "./error-state-matcher";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})



export class AddEmployeeComponent implements OnInit {
  customMatcher = new MyErrorStateMatcher();
  employeeForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  date = new Date;
  groupList = groupList;
  statusList = statusList;
  statusListFiltered
  groupListFiltered
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      basicSalary: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  cancel() {
    this.router.navigateByUrl("/table-list");
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.openSnackBar("Fill the blank field", "Dismiss");
    } else {
      this.router.navigateByUrl("/table-list");
    }
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

}


