import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

import { EmployeeService } from './employee.service'
import { employeeInterface } from './employee.interface'
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component'
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'gender', 'email', 'dateOfBirth', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.fetchemployees();
  }

  mode: ProgressSpinnerMode= 'indeterminate';

  constructor(public dialog: MatDialog, private empService: EmployeeService, private router:Router) {}

  fetchemployees() {
    this.empService.getEmployees().subscribe(
      responseData => {
        this.mode = 'indeterminate';
        this.dataSource = new MatTableDataSource(responseData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.mode= 'determinate'
      }
    )
  
  }
  employeeDialog(Empdata: employeeInterface, action) {
    let employeeData: employeeInterface;
    if (Empdata != null) {
      employeeData = Empdata;
    }
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: {
        employeeData, action
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        // this.empService.employee
      // console.log(this.fetchemployees());
    });

  }

  deleteDialog(Empdata: employeeInterface) {
    let employeeData: employeeInterface;
    if (Empdata != null) {
      employeeData = Empdata;
    }
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {
        employeeData
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchemployees();
    });
  }

  onRefresh(){
    this.fetchemployees();
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['../login']);
  }

}
