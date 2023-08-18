import { Injectable, ErrorHandler } from '@angular/core';
import { NgModule } from '@angular/core';

@Injectable()
export class ErrorHandling implements ErrorHandler {
  constructor() {}

  handleError(error: any) {
    console.error(error);
    alert(error);
  }
}

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class ErrorHandlingModule {}
