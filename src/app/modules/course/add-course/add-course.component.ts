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
  addCourseForm: FormGroup; // Form group for adding courses
  categories: Category[]; // Array to hold course categories
  Study = Object.keys(Study).filter(k => typeof Study[k as any] === 'number'); // Convert Study enum to array
  syllabusLength: number = 1; // Track the length of the syllabus

  // Method to handle adding a course
  addCourse() {
    const data = { ...this.addCourseForm.value }; // Copy form values
    console.log(data); // Log form values to the console
  }

  // Method to generate an array of a specified length
  generateArray(length: number): any[] {
    return Array(length).fill(0).map((_, index) => index);
    // Return an array of length 'length' filled with incremental numbers
  }

  // Method to handle user input in syllabus fields
  onInput(e) {
    if (e.target.key != 13) // Check if Enter key is pressed
      return;
    if (e.target.value != '' && !this.addCourseForm.contains('input' + (this.syllabusLength))) {
      // If input is not empty and a form control for the next syllabus item doesn't exist
      this.addCourseForm.addControl('input' + this.syllabusLength, new FormControl('')); // Add a new syllabus input control
      this.syllabusLength++; // Increment syllabus length
    }
  }

  constructor(private _courseService: CourseService) {

    this.addCourseForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "category": new FormControl(''),
      "start": new FormControl(''),
      "input0": new FormControl(''),
      "image": new FormControl(''),
      "countOfLessons": new FormControl(''),
      "study": new FormControl('')
    })

    // Fetch categories from the CourseService
    this._courseService.getCategories().subscribe(res => {
      this.categories = res; // Assign categories to the component property
    }, err => {
      console.log(err); // Log any errors to the console
    })
  }
}
