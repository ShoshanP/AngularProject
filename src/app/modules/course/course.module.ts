import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CourseService } from 'src/app/services/course.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { SmallCourseDetailsComponent } from './small-course-details/small-course-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AllCoursesComponent,
    CourseDetailsComponent,
    AddCourseComponent,
    EditCourseComponent,
    SmallCourseDetailsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule, MatButtonModule, MatGridListModule,MatIconModule
  ],
  exports: [AllCoursesComponent,AddCourseComponent,CourseDetailsComponent],
  providers:[CourseService,Router]
})
export class CourseModule { }
