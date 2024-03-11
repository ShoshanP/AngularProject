import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
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
  email = new FormControl('', [ Validators.email]);
  error: boolean = false;
  users : User[];

  /**
   *
   */
  constructor(private _userService: UserService) {
    this.loginForm = new FormGroup({ "email": this.email, "password": new FormControl('', Validators.required) });
   

  }
  ngOnInit(){
    this._userService.getUsers().subscribe(res =>{
      this.users = res;
    }, (err)=>{
      console.log(err)
    })
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';

  }

  checkUser(){
  
    const user = this.users.find(u => u.mail === this.loginForm.controls['email'].value);
    if (user) {
      if (user.password ===  this.loginForm.controls['password'].value) {
        console.log( 'success');
         // שם משתמש וסיסמה נכונים
      } else {
        console.log( 'invalid_password'); // סיסמה שגויה
      }
    } else {
      console.log( 'invalid_username'); // שם משתמש לא קיים
    }
  }
   



  }

