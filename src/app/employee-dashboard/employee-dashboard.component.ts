import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { EmployeeModel } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeData !: any;
  employeeObj : EmployeeModel = new EmployeeModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      Department: [''],
      Designation: [''],
      DOB: ['']
    })
    this.getEmployeeDetails();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    this.employeeObj.firstName = this.formValue.value.firstName;
     this.employeeObj.lastName = this.formValue.value.lastName;
     this.employeeObj.Department = this.formValue.value.Department;
     this.employeeObj.Designation = this.formValue.value.Designation;
     this.employeeObj.DOB = this.formValue.value.DOB;
    this.api.PostEmployee(this.employeeObj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();
      })
  }
  getEmployeeDetails() {
    this.api.GetEmployees()
    .subscribe(res=>{
      this.employeeData = res;

    })
  }
  editEmployeeDetail(){
     this.employeeObj.firstName = this.formValue.value.firstName;
     this.employeeObj.lastName = this.formValue.value.lastName;
     this.employeeObj.Department = this.formValue.value.Department;
     this.employeeObj.Designation = this.formValue.value.Designation;
     this.employeeObj.DOB = this.formValue.value.DOB;
    this.api.UpdateEmployee(this.employeeObj,this.employeeObj.id)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();
    })
  }
  onEdit(row : any){
    this.employeeObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['Department'].setValue(row.Department);
    this.formValue.controls['Designation'].setValue(row.Designation);
    this.formValue.controls['DOB'].setValue(row.DOB);
    this.showUpdate = true;
    this.showAdd = false;
  }

  deleteEmployeeDetail(row : any){
   let clickedYes = confirm("Are you sure want to delete");
   if(clickedYes){
    this.api.DeleteEmployee(row.id)
    .subscribe(res=>{
      alert("Deleted Successfully");
      this.getEmployeeDetails();
    })
   }

  }
}
