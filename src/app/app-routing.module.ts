import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login/login.component';
import { RegisterComponent } from './modules/login/register/register.component';
import { AllCoursesComponent } from './modules/course/all-courses/all-courses.component';
import { AddCourseComponent } from './modules/course/add-course/add-course.component';
import { CourseDetailsComponent } from './modules/course/course-details/course-details.component';
import { EditCourseComponent } from './modules/course/edit-course/edit-course.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "courses", component: AllCoursesComponent},
  {path: "addCourse", component: AddCourseComponent},
  { path: 'course/:id', component: CourseDetailsComponent },
  { path: 'editCourse', component: EditCourseComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
