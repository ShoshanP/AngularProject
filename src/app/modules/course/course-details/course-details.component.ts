enum Study {
  Online,
  Offline,
  Hybrid
}

import { Component, Injectable, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCourseComponent } from '../edit-course/edit-course.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
@Injectable()
export class CourseDetailsComponent {
  courseId: number; // Holds the ID of the course being viewed
  myCourse; // Holds the details of the course
  syllabus: string[]; // Array to hold the syllabus of the course
  isLecture = localStorage.getItem('isLecture'); // Retrieves 'isLecture' from local storage


  ngOnInit(): void {
    this.courseId = +this._route.snapshot.paramMap.get('id'); // Extracts the course ID from the route parameters
    this.myCourse = this.getCourseDetails(this.courseId); // Retrieves course details by ID
    this.syllabus = this.myCourse?.syllabus; // Assigns syllabus of the course
  }
 
  constructor(
    private _route: ActivatedRoute, // Provides access to route parameters
    private _courseService: CourseService, // Service for fetching course details
    public dialog: MatDialog // Service for opening dialogs
  ) {}

  // Method to get the description of the course type based on its enum value
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

  // Method to fetch course details by ID from the service
  getCourseDetails(id: number): void {
    this._courseService.getCourseById(id).subscribe(
      (data) => {
        this.myCourse = data; // Assigns fetched course details
      },
      (error) => {
        console.error('Error fetching course details: ', error); // Logs error if fetching fails
      }
    );
  }

  // Method to open the edit course dialog
  editCourse() {
    const dialogRef = this.dialog.open(EditCourseComponent, {
      data: { myCourse: this.myCourse }, // Passes current course details to the dialog
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'); // Logs message when the dialog is closed
    });
    console.log("click", this.myCourse); // Logs course details when the edit button is clicked
  }
}
