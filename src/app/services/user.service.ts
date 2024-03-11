import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class UserService {
  private _baseUrl: string = 'https://localhost:7175/api/User';

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this._baseUrl);
  }
  addUser(user): Observable<boolean>{
    console.log("you want to add user: ",user);
   return this._http.post<boolean>(this._baseUrl,user);
  }






  constructor(private _http: HttpClient) {

  }
}