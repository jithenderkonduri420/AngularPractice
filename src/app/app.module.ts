import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsermanagementComponent } from './components/usermanagement/usermanagement.component';
import { ComponentsModule } from "./_common/common.module"
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { Child1Component } from './components/dashboard/child1/child1.component';
import { Child2Component } from './components/dashboard/child2/child2.component';
import { IndependentComponent } from './components/independent/independent.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    UsermanagementComponent,
    Child1Component,
    Child2Component,
    IndependentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      closeButton: true,
      preventDuplicates: true
    })
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
