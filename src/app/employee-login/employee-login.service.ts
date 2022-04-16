import { Login, LoginEmployee } from './employee-login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
//import { Headers, RequestOptions,HttpClient } from '@angular/common/http';
//import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLoginService {

  constructor(private httpClient: HttpClient) {}

  apiURL = 'http://localhost:9000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API post() method => Login employee
  loginEmployee(employee: any): Observable<LoginEmployee> {
    return this.httpClient
      .post<LoginEmployee>(
        this.apiURL + '/authenticate',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  registerEmployee(employee : any){

    return this.httpClient.post(
      this.apiURL + '/register',
      JSON.stringify(employee),
      this.httpOptions
    )
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';

   
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

      switch (error.status) {
        case 400:
          errorMessage = "Bad Request.";
          break;
        case 401:
          errorMessage = "You need to log in to do this action.";
          break;
        case 403:
          errorMessage = "You don't have permission to access the requested resource.";
          break;
        case 404:
          errorMessage = "The requested resource does not exist.";
          break;
        case 412:
          errorMessage = "Precondition Failed.";
          break;
        case 500:
          errorMessage = "Internal Server Error.";
          break;
        case 503:
          errorMessage = "The requested service is not available.";
          break;
        case 422:
          errorMessage = "Validation Error!";
          break;
        default:
          errorMessage = "Something went wrong!";
      }
    }

   
    
    return throwError(() => {
      return errorMessage;
    });
  }
}
