import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { LoginModule } from './modules/login/login.module';
import { UserService } from './services/user.service';
import { CourseModule } from './modules/course/course.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
   LoginModule,
   CourseModule
  
  ],
  providers: [ UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
