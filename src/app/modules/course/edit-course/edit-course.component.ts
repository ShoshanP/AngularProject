import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';

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
  syllabusControls; // Add syllabusControls variable

  constructor(
    private _route: Router,
    public dialogRef: MatDialogRef<EditCourseComponent>,
    private _courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.editCourseForm = new FormGroup(
      {
        "name": new FormControl(this.data.myCourse.name),
        "category": new FormControl(this.data.myCourse.category.id),
        "start": new FormControl(this.data.myCourse.start),
        // "syllabus": new FormControl(this.data.myCourse.syllabusArr),
        "image": new FormControl(this.data.myCourse.image),
        "study": new FormControl(this.Study[this.data.myCourse.study])
      }
    )


    // this.editCourseForm = this.formBuilder.group({
    //   name: [this.data.myCourse.name, Validators.required],
    //   category: [this.data.myCourse.category.id, Validators.required],
    //   startDate: [new Date(this.data.myCourse.start), Validators.required],
    //   image: [this.data.myCourse.image],
    //   study: [this.data.myCourse.study, Validators.required],
    //   // syllabus: this.formBuilder.array([])
    // });

    // this.data.myCourse.syllabus.forEach((str, index) => {
    //   this.syllabus.push(this.formBuilder.control(str));
    // });

    // this.editCourseForm = this.formBuilder.group({});
    this.data.myCourse.syllabus.forEach((str, index) => {
      this.editCourseForm.addControl(`input${index}`, new FormControl(str));
    });
    this.syllabusControls = this.editCourseForm.get('syllabus');
    console.log(this.editCourseForm);
    console.log(
      this.data.myCourse);



    _courseService.getCategories().subscribe(res => {
      this.categories = res;
      console.log(this.categories);

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
        // startDate: this.editCourseForm.value.start.toISOString()
      };
      const studyName = formData.study;
      const studyIndex = Object.values(Study).indexOf(studyName);


      if (studyIndex !== -1) {
        formData.study = studyIndex;
      } else {
        console.error('Study not found in enum:', studyName);
      }

      const categoryID = formData.category;
      const objects = [{ id: 1 }, { id: 2 }, { id: 3 }]
      const category = this.categories.find((cat) => {

        return categoryID == cat.id
      });
      //console.log(categoryID);
      console.log(category);

      // Assign the category object to the category field
      if (category) {
        formData.category = category;
      } else {
        console.error('Category not found for ID:', categoryID);
      }

      const syllabus = Object.keys(formData)
        .filter(key => key.startsWith('input')) // Filter keys starting with 'input'
        .map(key => formData[key]); // Get values corresponding to filtered keys

      // Create a new object with the original properties and the 'syllabus' and 'category' fields
      const newData = {
        ...formData,
        syllabus: syllabus,
      };

      Object.keys(newData).forEach(key => {
        if (key.startsWith('input')) {
          delete newData[key];
        }
      });
      console.log('Form data to submit:', newData);
      // Send formData to the server
      this._courseService.changeCourse(newData, this.data.myCourse.id).subscribe(res => {
        console.log("success to change", res);
        this._route.navigate([`/courses`]);
        this.dialogRef.close();
      }, err => {
        console.log(err);


      })
    } else {
      console.error('Form is invalid');
    }
  }

  onNoClick(): void {
    console.log("close",
      this.data.myCourse.id);
    this._route.navigate([`/courses`]);


  }

  onInputBlur(event: any, index: number) {
    const controlName = event.target.name;

    const control = this.editCourseForm.get(controlName) as FormControl;

    if (control) {
      console.log(control);


      if (control.value == '') {
        // If input becomes empty, remove the control from the form array
        this.removeControlByName(this.editCourseForm, controlName);
      }
    } else {
      console.error(`${controlName} is not a FormArray.`);
    }
  }

  removeControlByName(formGroup: FormGroup, controlName: string): void {
    ;
    if (formGroup.contains(controlName)) {
      console.log("try remove", controlName);

      formGroup.removeControl(controlName);
      console.log("form", formGroup);

    } else {
      console.error(`Control with name ${controlName} not found in FormGroup.`);
    }
  }

}
