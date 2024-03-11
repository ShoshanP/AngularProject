import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
})
export class AppComponent {
  title = 'final-project';
  navLinks: any[];
  activeLinkIndex = -1; 
  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'home',
        link: './',
        index: 0
    },
        {
            label: 'login',
            link: './login',
            index: 1
        }, {
            label: 'register',
            link: './register',
            index: 2
        }, {
            label: 'all courses',
            link: './courses',
            index: 3
        }, 
        {
          label: 'add course',
          link: './addCourse',
          index: 4
      },
    ];
}
ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}
}
