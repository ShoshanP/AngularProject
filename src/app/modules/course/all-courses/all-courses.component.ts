import { Component, Injectable } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
@Injectable()
export class AllCoursesComponent {

  courses: Course[]; // Array to hold all courses
  filtercourses: Course[] = []; // Array to hold filtered courses based on search
  private searchSubject = new Subject<string>(); // Subject for search term
  searchCourse$: Observable<Course[]>; // Observable for search results
  searchText: string = ""; // Search text input

  // Method to search for courses based on a given term
  searchCourse(term: string): Observable<Course[]> {
    return new Observable((observer) => {
      if (term.trim() === "") {
        observer.next(this.courses); // If search term is empty, return all courses
      } else {
        const filteredCourses = this.courses.filter(course =>
          course.name.toLowerCase().includes(term.toLowerCase()) // Filter courses by name containing the search term
        );
        observer.next(filteredCourses); // Emit filtered courses
      }
    });
  }

  // Method to trigger search when input changes
  onSearchInputChange(): void {
    this.searchSubject.next(this.searchText); // Emit search term to the search subject
  }

  // Setup search observable with debounce and distinctUntilChanged
  private setupSearchObservable(): void {
    this.searchCourse$ = this.searchSubject.pipe(
      debounceTime(300), // Wait for 300ms after user stops typing
      distinctUntilChanged(), // Emit only distinct search terms
      switchMap((term: string) => this.searchCourse(term)) // Switch to new search term and return search results
    );
    // Subscribe to search results and update filtered courses
    this.searchCourse$.subscribe((result: Course[]) => {
      this.filtercourses = result;
    });
  }

  // Constructor
  constructor(private _courseService: CourseService) {
  }

  
  ngOnInit() {
    // Fetch all courses from the CourseService
    this._courseService.getCourses().subscribe(res => {
      this.courses = res; // Assign fetched courses
      this.filtercourses = res; // Initialize filtered courses with all courses
      this.setupSearchObservable(); // Setup search functionality
    }, (err) => {
      console.log(err); 
    });
  }
}
