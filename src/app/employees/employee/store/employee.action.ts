// Section 1

import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { EmployeeModel } from '../employee.model'

// Section 2
export const ADD_CRUD       = 'ADD_CRUD'
export const REMOVE_CRUD    = 'REMOVE_CRUD'
export const UPDATE_CRUD    = 'UPDATE_CRUD'
export const FETCH_EMPLOYEE    = 'FETCH_EMPLOYEE'
export const STORE_EMPLOYEE    = 'STORE_EMPLOYEE'
// Section 3
export class AddTutorial implements Action {
    readonly type = ADD_CRUD;
    payload: EmployeeModel;
}

export class RemoveTutorial implements Action {
    readonly type = REMOVE_CRUD;
    constructor(public payload: number
     ) {}
}
export class UpdateTutorial implements Action {
  readonly type = UPDATE_CRUD;
  payload: EmployeeModel;
}

export class FetchEmployee implements Action {
  readonly type = FETCH_EMPLOYEE;
  payload: EmployeeModel;
}
export class StoreEmployee implements Action {
  readonly type = STORE_EMPLOYEE;
  payload: EmployeeModel;
}
// Section 4
export type EmployeeActions =
AddTutorial | RemoveTutorial | UpdateTutorial  |  StoreEmployee | FetchEmployee;
