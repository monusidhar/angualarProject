import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

import {employeeInterface} from './employee.interface';
import {environment} from '../../environments/environment'
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn:'root'
})
export class EmployeeService{

    public employee= new BehaviorSubject<any>([]);

    constructor(private http: HttpClient){}

    AddEmployee(employee:employeeInterface){
      return  this.http.post<employeeInterface>(environment.app_emp_url + 'employee.json' ,employee);
    }

    updateEmployee(id, updatedEmployee: employeeInterface) {
        return this.http.put<employeeInterface>(environment.app_emp_url + 'employee/' + id + '.json' , updatedEmployee);
    }

    deleteEmployee(id: string) {
        return this.http.delete<employeeInterface>(environment.app_emp_url  + 'employee/' + id + '.json');
    }

    getEmployees(){
        return this.http.get(environment.app_emp_url + 'employee.json').pipe(
            map(responseData => {
                const postArray=[]
                for(const key in responseData){
                    if(responseData.hasOwnProperty(key)){
                        postArray.push({...responseData[key], id:key});
                    }
                }
                return postArray;
            })
          );
    }
}
