import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
@Injectable()
export class AppComponent {
  title = 'final-project';
  navLinks: any[];
  activeLinkIndex = -1;
  currentUser: User;
  constructor(private router: Router, private _userService: UserService) {
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

    this._userService.getCurrentUser().subscribe(res => {
      console.log("current", res);

      this.currentUser = res;
    }, err => {
      console.log(err);

    });
    console.log("current user: ", this.currentUser);
  }
  logOut() {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });


  }
}
