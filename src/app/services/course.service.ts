import { Injectable } from "@angular/core";
import { Course } from "../models/course.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { User } from "../models/user.model";
import { Category } from "../models/category.model";

@Injectable()
export class CourseService {
  private _base_url: string = 'https://localhost:7175/api/Course';
  getCourses(): Observable<Course[]> {
    console.log("get course");
    
    return this._http.get<Course[]>(this._base_url);
  }

  getCourseById(id): Observable<User> {
    console.log("get course");
    return this._http.get<User>(`${this._base_url}/${id}`);
  }

  getCategories(): Observable<Category[]> {
   
    return this._http.get<Category[]>(`${this._base_url}/categories`);
  }

  changeCourse(course: Course, id:number):Observable<any>{
    console.log("try to change",id,course);
    return this._http.put<Course>(`${this._base_url}/${id}`,course);
  }

  constructor(private _http: HttpClient) {

  }
}