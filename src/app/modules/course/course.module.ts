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
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';

import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LectureService } from 'src/app/services/lecture.service';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';


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
    MatCardModule, MatButtonModule, MatGridListModule,MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  MatDialogModule,
  MatPseudoCheckboxModule,
  MatCardModule, FormsModule,
  MatRadioModule
  ],
  exports: [AllCoursesComponent,AddCourseComponent,CourseDetailsComponent,EditCourseComponent],
  providers:[CourseService,Router],
  
})
export class CourseModule { }
