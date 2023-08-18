import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './modules/login/components/login/login.component';
import { Interceptors } from './http.interceptor';
import { ErrorHandling } from './error-handling.module';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptors,
      multi: true,
    },
    { provide: ErrorHandler, useClass: ErrorHandling },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
