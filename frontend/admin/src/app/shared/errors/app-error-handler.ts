import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler{
    handleError(error: any): void {
        // use toast notification
          // also log that error
          alert('An unexpected error occurred.');
          // log in server or file later on
          console.log(error);
    }
    
}