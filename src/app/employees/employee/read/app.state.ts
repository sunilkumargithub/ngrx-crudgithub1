import { EmployeeModel} from '../employee.model';

export interface AppState {
  readonly EmployeeActions: EmployeeModel[];
}
