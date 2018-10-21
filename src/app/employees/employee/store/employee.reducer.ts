import { Action } from '@ngrx/store'
import { EmployeeModel } from '../employee.model';
import * as EmployeeActions from './employee.action';

export interface State {
  employeelist: EmployeeModel[];
  employee: EmployeeModel;
 // editedIngredientIndex: number;
}
// Section 1
const initialState: EmployeeModel = {
    name: 'Initial Tutorial',
    email: 'sunil@gmail.com',
    mobile: 985342722,
    salary: 1000000

};

// Section 2
export function Employeereducer(state: EmployeeModel[] = [initialState], action: EmployeeActions.EmployeeActions) {

    // Section 3
    switch (action.type) {
        case EmployeeActions.ADD_CRUD:
            return [...state, action.payload];

        case EmployeeActions.REMOVE_CRUD:
            state.splice (action.payload, 1);
            //state.splice (1);
            return state;
        case EmployeeActions.STORE_EMPLOYEE:
        return [...state, action.payload];

        default:
            return state;
    }
}
