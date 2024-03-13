import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, QueryList } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LectureService } from 'src/app/services/lecture.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
@Injectable()
export class LoginComponent {

  hide = true;
  loginForm: FormGroup;
  email = new FormControl('', [Validators.email]);
  error: boolean = false;
  users: User[];
  passwordError = '';
  lecture: boolean = false;

  /**
   *
   */
  constructor(private _userService: UserService, private _lectureService: LectureService, private _router: Router) {
    this.loginForm = new FormGroup(
      {
        "email": this.email, "password": new FormControl('', Validators.required),

        "courseName": new FormControl('', Validators.required)
      });

    this._userService.getUsers().subscribe(res => {
      this.users = res;
    }, (err) => {
      console.log(err)
    })


  }
  ngOnInit() {

  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';

  }

  checkUser() {

    const user = this.users.find(u => u.mail === this.loginForm.controls['email'].value);
    if (user) {
      if (user.password === this.loginForm.controls['password'].value) {
        console.log('success');
        this._userService.setCurrentUser(user);
        localStorage.setItem('userDetails', JSON.stringify(user));
       
          if (this._lectureService.IsLecture(user))
            localStorage.setItem('isLecture', "true");
        

        this._router.navigate(['/courses']);
        // שם משתמש וסיסמה נכונים
      } else {
        console.log('invalid_password');
        this.passwordError = "incorrect password";
      }
    } else {
      console.log('invalid_username');
      alert("user name dont exist, please sign up!");
      this._router.navigate(['/register']);
      // שם משתמש לא קיים
    }
  }

  setLectureOption() {
    this.lecture = !this.lecture;
  }


}

