import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent implements OnInit {

  ngOnInit(){}

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private employeeService: EmployeeService ){
    console.log('delete', data)
  }
 
  onDelete(id){
    this.employeeService.deleteEmployee(id).subscribe(
      responseData => {
        console.log('this is delete call response', responseData )
      }
    );
  }

}
