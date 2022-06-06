import { UserDetails } from './user-detail.component';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class UserDetailService {

    constructor(private httpClient: HttpClient) { }

    apiURL = 'http://localhost:9000';


    httpOptions = {
        headers: new HttpHeaders({
           
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            "Content-Type": "application/json"

        }),
    };



    //get all users 
    getAllUsers(): Observable<[UserDetails]> {
        return this.httpClient.get<[UserDetails]>(
            this.apiURL + '/api/v1/user/getAll',
            this.httpOptions
        )
            .pipe(retry(1), catchError(this.handleError));
    }

    
    updateEmail(email : String, name: String): Observable<any> {
        return this.httpClient.put(
            this.apiURL + '/api/v1/user/update/email',
            JSON.stringify({
                "userName": name,
                "newEmail": email
            }),
            this.httpOptions
          )
            .pipe(retry(1), catchError(this.handleError));
    }

    deleteUser(name:String): Observable<any> {
        return this.httpClient.delete(
            this.apiURL + '/api/v1/user/user/' + name,
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