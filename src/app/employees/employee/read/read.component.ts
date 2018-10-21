import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../employee.model';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import * as EmployeeActions from '../store/employee.action';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

 // Section 1
 Employee: Observable<EmployeeModel[]>;

  // Section 2
  constructor(private store: Store<AppState>) {
    this.Employee = store.select('EmployeeAction');
  }


  ngOnInit() {
  }

  delTutorial(index) {
    this.store.dispatch(new CrudActions.RemoveTutorial(index) );
  }

}
