import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';

import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import { CategoryService } from './../../services/category.service';
import { AppError } from './../../shared/errors/app-error';
import { BadInput } from './../../shared/errors/bad-input';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('closebutton') closebutton;
  categories: any[] = [];
  // also show posting posted deleting deleted and updating updated stats

  form = new FormGroup({
    name: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(120),
      // CategoryNameValidators.cannotContainSpace
    ]
      )
  });

  get name(){
    return this.form.get('name');
  }

  constructor(
    private service:CategoryService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.service.getAll()
          .subscribe(categories => {
            this.categories = categories as any[];
            console.log(this.categories);
          });
  }

  createCategory(){
    let category = this.form.value;
    
    this.service.create(category)
    .subscribe(category =>{
      this.categories.splice(0,0,category);
      },
      (error: AppError) =>{
        // this.categories.splice(0,1);
        console.log(error)
        if (error instanceof BadInput)
          alert('Bad request');
        else throw error;  
      });
  }

  updateCategory(category:any){
    let updatedCategory = this.form.value;

    this.service.update(updatedCategory,category._id)
        .subscribe(updatedCategory => {
           category.name = updatedCategory['name'];  
           this.closebutton.nativeElement.click();
        },(error)=>{

        });
  }

  deleteCategory(category) {
    let index = this.categories.indexOf(category);

      
      this.service.delete(category._id)
      .subscribe(
        () => { 
          this.categories.splice(index, 1);
        },
        (error: AppError) => {
          // console.log(error,"hello");
            // this.categories.splice(index, 0,category);

            if (error instanceof NotFoundError)
              alert('This post has already been deleted');
            else throw error;
          });
    
   
  }

}
