import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NotificationsComponent } from "../notifications/notifications.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.openSnackBar("Username or Password are required", "Dismiss")
    } else {
      if (this.loginForm.value.username == "bypass@gmail.com" && this.loginForm.value.password == "123456") {
        sessionStorage.setItem('username', this.loginForm.value.username);
        this.router.navigateByUrl('/table-list');
      } else {
        this.openSnackBar("Your credential doesn't match our documentation", "Dismiss")
      }
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


