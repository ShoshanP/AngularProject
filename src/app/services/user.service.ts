import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class UserService {
  private _baseUrl: string = 'https://localhost:7175/api/User';
  private currentUser: User;
  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this._baseUrl);
  }
  addUser(user): Observable<boolean> {
    console.log("you want to add user: ", user);
    return this._http.post<boolean>(this._baseUrl, user);
  }

  getCurrentUser(): Observable<User> {
    // Get the user details from localStorage
    const userDetailsString = localStorage.getItem('userDetails');
  
    // Check if userDetailsString is not null or undefined
    if (userDetailsString) {
      // Parse the string to get the user details object
      const userDetails: User = JSON.parse(userDetailsString);
      
      // Return an Observable of type User containing the user details
      return of(userDetails);
    } else {
      // If userDetailsString is null or undefined, return an Observable of undefined
      return of(undefined);
    }
  }

  setCurrentUser(userName){

  }






  constructor(private _http: HttpClient) {

  }
}