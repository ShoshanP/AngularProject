
enum Study
{
    Online,
    Offline,
    Hybrid
}

import { Component, Input } from '@angular/core';
import { Course } from 'src/app/models/course.model';
@Component({
  selector: 'app-small-course-details',
  templateUrl: './small-course-details.component.html',
  styleUrls: ['./small-course-details.component.css']
})
export class SmallCourseDetailsComponent {
  @Input()
  myCourse: Course;

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
}
