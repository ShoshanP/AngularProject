import { Injectable } from "@angular/core";
import { Course } from "../models/course.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class CourseService{
    private _base_url: string = 'http://localhost:7175/api/courses';
    getUsers():Observable<Course[]>{
      return this._http.get<Course[]>(this._base_url);  
    }
   
    
    constructor(private _http:HttpClient) {
          
    }
}