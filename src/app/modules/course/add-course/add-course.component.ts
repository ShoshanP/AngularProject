import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { CourseService } from 'src/app/services/course.service';
enum Study {
  Online,
  Offline,
  Hybrid
}
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  addCourseForm: FormGroup;
  categories: Category[];
  Study = Object.keys(Study).filter(k => typeof Study[k as any] === 'number');
  syllabusLength: Number = 0;

  addCourse() {

  }
  /**
   *
   */
  constructor(private _courseService: CourseService) {

    this.addCourseForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "category": new FormControl(''),
      "start": new FormControl(''),
      "input0": new FormControl(''),
      "image": new FormControl(''),
      "study": new FormControl('')
    })

    this._courseService.getCategories().subscribe(res => {
      this.categories = res;
    }, err => {
      console.log(err);

    })
  }
}
