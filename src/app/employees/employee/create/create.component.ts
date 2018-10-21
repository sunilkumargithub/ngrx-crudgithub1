import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as EmployeeActions from '../store/employee.action';
import { AppState } from '../read/app.state';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onAddemployee(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const mobile = form.value.mobile;
    const salary = form.value.salary;



      this.store.dispatch(new EmployeeActions.StoreEmployee({
        name: name, email: email,  mobile: mobile, salary: salary} ) );
        console.log('store is: ', this.store);

  }

}
