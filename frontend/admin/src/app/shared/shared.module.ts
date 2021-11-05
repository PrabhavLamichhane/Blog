import { AddBlogComponent } from '../blog/add-blog/add-blog.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { KebabcasePipe } from './pipes/kebabcase.pipe';



@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    KebabcasePipe
  ],
  imports: [
    CommonModule,
    RouterModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    NavigationComponent,
    FooterComponent,
    KebabcasePipe
  ]
})
export class SharedModule { }