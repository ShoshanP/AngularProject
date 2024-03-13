import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { LectureService } from 'src/app/services/lecture.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,MatIconModule,ReactiveFormsModule,FormsModule,
    MatCardModule
  ],
  exports: [LoginComponent,RegisterComponent],
  providers:[UserService,Router,LectureService]
  
})
export class LoginModule { }
