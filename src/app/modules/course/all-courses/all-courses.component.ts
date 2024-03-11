import { Component, Injectable } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
@Injectable()
export class AllCoursesComponent {

  courses:Course[];
  /**
   *
   */
  constructor(private _courseService:CourseService) {
    
    this._courseService.getCourses().subscribe(res =>{
      
      this.courses = res;
      console.log("courses from server",this.courses)
    }, (err)=>{
      console.log(err)
    })
  }
  ngOnInit(){
 
  }

}
