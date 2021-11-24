import { AddBlogComponent } from '../blog/add-blog/add-blog.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { KebabcasePipe } from './pipes/kebabcase.pipe';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    KebabcasePipe,
    NoAccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    InfiniteScrollModule
    
  ],
  exports:[
    NavigationComponent,
    FooterComponent,
    KebabcasePipe,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    InfiniteScrollModule 
  ]
})
export class SharedModule { }