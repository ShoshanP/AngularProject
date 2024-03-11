import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallCourseDetailsComponent } from './small-course-details.component';

describe('SmallCourseDetailsComponent', () => {
  let component: SmallCourseDetailsComponent;
  let fixture: ComponentFixture<SmallCourseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallCourseDetailsComponent]
    });
    fixture = TestBed.createComponent(SmallCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
