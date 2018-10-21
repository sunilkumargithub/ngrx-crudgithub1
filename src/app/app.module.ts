import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HeaderComponent } from './core/header/header.component';

import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { CreateComponent } from './employees/employee/create/create.component';
import { ReadComponent } from './employees/employee/read/read.component';
import { StoreModule } from '@ngrx/store';
import { Employeereducer } from './employees/employee/store/employee.reducer';

//
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module'
import { CoreModule } from './core/core.module';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AuthEffects } from './auth/store/auth.effects';
//

@NgModule({
  declarations: [
   // HeaderComponent,
    AppComponent,
    EmployeeComponent,
    CreateComponent,
    ReadComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot({
      Addcrud: Employeereducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
