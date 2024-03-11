enum Study {
  Online,
  Offline,
  Hybrid
}

import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
@Injectable()
export class CourseDetailsComponent {
  courseId:number;
  myCourse;
  sylabus:string[];

  ngOnInit(): void {
    
  this.courseId= +this._route.snapshot.paramMap.get('id');
  this.myCourse=this.getCourseDetails(this.courseId);
  console.log("course",this.myCourse)
  this.sylabus=this.myCourse.syllabus;
  }



  /**
   *
   */
  constructor(private _route: ActivatedRoute, private _courseService: CourseService) {


  }

  getCourseTypeDescription(type: number): string {
    switch (type) {
      case Study.Online:
        return 'Online';
      case Study.Offline:
        return 'Offline';
      case Study.Hybrid:
        return 'Hybrid';
      default:
        return 'Unknown';
    }
  }

  getCourseDetails(id: number): void {
     this._courseService.getCourseById(id).subscribe(
      (data) => {
        this.myCourse = data;
        console.log("course",this.myCourse)
      },
      (error) => {
        console.error('Error fetching course details: ', error);
      }
    );
    console.log("course after",this.myCourse)
    

  }
}
