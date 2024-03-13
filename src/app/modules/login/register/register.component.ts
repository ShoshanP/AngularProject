import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Injectable()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hide: true;
  email = new FormControl('', [Validators.email,Validators.required]);
  error: boolean = false;

  addUser() {
   
    let userToAdd = {
      "name": this.registerForm.controls['name'].value,
      "mail": this.registerForm.controls['mail'].value,
      "password": this.registerForm.controls['password'].value,
    }
    this._userService.addUser(userToAdd).subscribe(
      response => {
        console.log('המשתמש נוסף בהצלחה למערכת');
        
      },
      error => {
        console.error('אירעה שגיאה בעת הוספת המשתמש למערכת:', error);

      }
    );
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';

  }

  
  /**
   *
   */
  constructor(private _userService: UserService) {
    
    this.registerForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "mail": this.email,
      "password": new FormControl('', Validators.required)
    })


  }
  ngOnInit(){
   
  }
}
