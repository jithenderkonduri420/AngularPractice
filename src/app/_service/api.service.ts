import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, first, map, take } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class ApiService {
  currentUserSubject: BehaviorSubject<User>;
  currentUserValue: Observable<User>;
  sampleSubject = new Subject<any>();
  sampleSubject$ = this.sampleSubject.asObservable();
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUserValue = this.currentUserSubject.asObservable();

  }
  public processError(error: any): Observable<any> {
    let title = "";
    let errorJson;
    if (error && error.json) {
      errorJson = error.json();
    } else {
      errorJson = error;
    }

    switch (error.status) {
      case 0:
        title = "Failed to reach API";
        this.toastr.error("Please try again in a couple of moments", title);
        break;
      case 401:
        if (errorJson.message === "Client or key not accepted") {
          this.logOut();
        }
        title = "Login Required";
        this.toastr.error("You'll need to log in again to continue.", title);
        break;
      case 405:
        title = "Endpoint doesn't exist";
        this.toastr.error(
          "We had an issue accessing one of our endpoints",
          title
        );
        break;
      case 500:
        this.displayMessage(errorJson);
        break;
      default:
        this.displayMessage(errorJson);
        break;
    }

    console.error(title, error);

    return throwError(error);
  }

  private displayMessage(errorJson) {
    if (errorJson && errorJson.error && errorJson.error.message) {
      let message = JSON.stringify(errorJson.error.message);
      let details = errorJson.error.details;
      if (errorJson.error.message.message) {
        message = errorJson.error.message.message;
        details = errorJson.error.message.details;
      }

      if (typeof details === "string") {
        this.toastr.error(details, message);
      } else {
        this.toastr.error(message, errorJson.code);
      }
    } else if (errorJson) {
      this.toastr.error(errorJson.message, errorJson.code);
    }
  }

  login(login: User){
    return this.http.post(`${environment.api}/users/authenticate`, login).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }))
  }
  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  registration(registration: User): Observable<User>{
    return this.http.post<User>(`${environment.api}/users/register`, registration);
  }
  public get currentUser(): User {
    return this.currentUserSubject.value;
  }
  public users(): Observable<any> {
    return this.http.get<User>(`${environment.api}/users`)
    .pipe(catchError((error: any) => this.processError(error)));;
  }
}
