import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class UserService{
    
    constructor(private http:HttpClient) {
          
    }
}