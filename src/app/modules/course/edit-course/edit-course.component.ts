import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';
import { Category } from 'src/app/models/category.model';

enum Study {
  Online,
  Offline,
  Hybrid
}

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent {
  categories: Category[];
  editCourseForm: FormGroup;
  Study = Object.keys(Study).filter(k => typeof Study[k as any] === 'number');

  constructor(
    public dialogRef: MatDialogRef<EditCourseComponent>,
    private _courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.editCourseForm = this.formBuilder.group({
      name: [this.data.myCourse.name],
      category: [this.data.myCourse.category.id],
      startDate: [new Date(this.data.myCourse.start)],
      image: [this.data.myCourse.image],
      study: [this.data.myCourse.study],
      syllabus: this.formBuilder.array([])
    });

    this.data.myCourse.syllabus.forEach((str, index) => {
      this.syllabus.push(this.formBuilder.control(str));
    });

    _courseService.getCategories().subscribe(res => {
      this.categories = res;
    }, err => {
      console.error(err);
    });
  }

  get syllabus() {
    return this.editCourseForm.get('syllabus') as FormArray;
  }

  editCourse() {
    if (this.editCourseForm.valid) {
      const formData = {
        ...this.editCourseForm.value,
        startDate: this.editCourseForm.value.startDate.toISOString()
      };

      console.log('Form data to submit:', formData);
      // Send formData to the server
      // Example: this.http.post<any>('your-server-url', formData).subscribe(...);
    } else {
      console.error('Form is invalid');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onInputBlur(controlName: string) {
    const control = this.editCourseForm.get(controlName);
    if (!control.value.trim()) {
      // If input becomes empty, remove the control from the form group
      this.editCourseForm.removeControl(controlName);
    } else if (!this.editCourseForm.get(controlName)) {
      // If input is no longer empty and control is not in the form group, add it back
      this.editCourseForm.addControl(controlName, new FormControl('', Validators.required));
    }
  }
}
