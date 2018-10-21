 import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, withLatestFrom, map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';

import * as EmployeeActions from './store/employee.action';
import {EmployeeModel} from '../employee/employee.model';
import * as Employeereducer from './store/employee.reducer';

@Injectable()
export class EmployeeEffects {

  @Effect({dispatch: false})
  employeeStore = this.actions$
    .ofType(EmployeeActions.STORE_EMPLOYEE)
    .pipe(withLatestFrom(this.store.select('employee')),
      switchMap(([action, state]) => {
        const req = new HttpRequest
        ('PUT', 'http://localhost:4000/employee', state , {reportProgress: true});
        return this.httpClient.request(req);
      }));

  constructor(private actions$: Actions,
           private httpClient: HttpClient,
          private store: Store<Employeereducer.State>) {
  }
}

