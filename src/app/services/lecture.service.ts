import { Observable } from "rxjs";
import { Lecture } from "../models/lecture.model";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { Injectable } from "@angular/core";
@Injectable()
export class LectureService {
    lectures: Lecture[];
    getLectures(): Observable<Lecture[]> {
        return this._httpClient.get<Lecture[]>('https://localhost:7175/api/Lecturer');
    }
    IsLecture(user :User): boolean{
      let lect =  this.lectures.find(l=>user.name==l.name&&user.mail==l.mail&&user.password==l.password);
      console.log("lectures",this.lectures);
      console.log("user",user);
      console.log("lect",lect);
       return lect?true:false; 
    }
    /**
     *
     */
    constructor(private _httpClient: HttpClient) {

        this.getLectures().subscribe(res => {
            this.lectures = res
        }, err => {
            console.log(err)
        })
    }


}