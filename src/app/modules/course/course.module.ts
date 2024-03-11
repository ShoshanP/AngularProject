import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';



@NgModule({
  declarations: [
    AllCoursesComponent,
    CourseDetailsComponent,
    AddCourseComponent,
    EditCourseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AllCoursesComponent,AddCourseComponent],
  providers:[]
})
export class CourseModule { }
