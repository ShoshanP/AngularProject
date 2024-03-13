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

  courses:Course[];
  filtercourses: Course[]=[];
  private searchSubject = new Subject<string>();
  searchCourse$: Observable<Course[]>;
  searchText: string = "";
  searchCourse(term: string): Observable<Course[]> {
    return new Observable((observer) => {
      if (term.trim() === "") {
        observer.next(this.courses);
      } else {
        const filteredStudents = this.courses.filter(cour =>
          cour.name.toLowerCase().includes(term.toLowerCase())
        );
        observer.next(filteredStudents);
      }
    });
  }
  onSearchInputChange(): void {
    this.searchSubject.next(this.searchText);
  }
  private setupSearchObservable(): void {
    this.searchCourse$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchCourse(term))
    );
  
    this.searchCourse$.subscribe((result: Course[]) => {
      this.filtercourses = result;
    });
  }
  /**
   *
   */
  constructor(private _courseService:CourseService) {
    
   
  }
  ngOnInit(){
    this._courseService.getCourses().subscribe(res =>{
      
      this.courses = res;
      this.filtercourses=res;
      this.setupSearchObservable();
      console.log("courses from server",this.courses)
    }, (err)=>{
      console.log(err)
    })
  }

}
