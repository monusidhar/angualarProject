import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit {


  empForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required])
  })
  action: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private empService: EmployeeService) {
    console.log(this.data);
    this.action = data.action
  }

  ngOnInit() {
    if (this.data.employeeData != null) {
      this.empForm = new FormGroup({
        name: new FormControl(this.data.employeeData.name),
        gender: new FormControl(this.data.employeeData.gender),
        email: new FormControl(this.data.employeeData.email),
        dateOfBirth: new FormControl(this.data.employeeData.dateOfBirth)
      })
    }
  }

  private   fetchemployees() {
    this.empService.getEmployees().subscribe(
      responseData => {}
    )
  }

  onSubmitEmp() {
    if (this.data.action === 'create') {
      this.empService.AddEmployee(this.empForm.value).subscribe(
        employeeAdded => {
          console.log(employeeAdded)

        }, error => {
          console.log(error)
        }
      )
    }
    else {
      var id= this.data.employeeData.id;
      this.empService.updateEmployee(id, this.empForm.value).subscribe(
        employeeUpdated => {
          console.log('congratulations! you have updated form');
          this.empService.employee.next(employeeUpdated);
        }
      )
    }



  }

  getEmailError() {
    if (this.empForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    else {
      return this.empForm.get('email').hasError('email') ? 'Not a valid email' : '';
    }
  }

}
