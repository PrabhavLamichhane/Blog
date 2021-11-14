import { BlogService } from '../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import 'quill-emoji/dist/quill-emoji.js';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';

import { CategoryService } from 'src/app/services/category.service';
import { AppError } from '../../shared/errors/app-error';
import { BadInput } from '../../shared/errors/bad-input';


Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  editorForm!: FormGroup;

  blured = false
  focused = false
  moduleConfig = {}

  editorContent: string | undefined;

  categories: any[] = [];
  blogId: any;

  invalidBlog: boolean;
  loading:boolean = false;
  adding:boolean = false;
  updating:boolean = false;

  blogError:string;

  constructor(
    private sanitizer: DomSanitizer,
    private service: CategoryService,
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.getEditor();
    this.getCategories();

    this.route.paramMap
      .subscribe(params => {
        this.blogId = params.get('id');
        if (this.blogId) this.getBlog(this.blogId);
      });

    this.editorForm = this.formBuilder.group({
      categoryId: new FormControl('', [
        Validators.required,
      ]),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),
      description: new FormControl(null,[
        Validators.required,
        // Validators.minLength(15),
      ])
    })
  }

  get f() {
    return this.editorForm.controls;
  }

  getCategories(): void {
    this.loading = true;
    this.service.getAll()
      .subscribe(categories => {
        this.categories = categories as any[];
        this.loading = false;
      });
  }

  getBlog(id): void {
    this.loading = true;
    if (id) {
      this.blogService.getOne(id)
        .subscribe(blog => {
          // this.blog = blog;
          this.editorForm.setValue({ categoryId: blog['category']['_id'], title: blog['title'], description: blog['description'] });
          this.loading = false;

        });
    }
  }

  onSubmit() {
    let blog = this.editorForm.value

    // this.editorContent = this.editorForm.get('description')?.value;
    if (this.blogId) {
      this.updating = true;
      this.blogService.update(blog, this.blogId)
        .subscribe(category => {
          // this.categories.splice(0,0,category);
          alert('updated');
          this.updating = false;
        },
        (error: AppError) => {
          if (error instanceof BadInput){
            this.invalidBlog = true;
            this.updating = false;
            this.blogError = error.message;
          }
          else throw error;
        });
    } else {
      this.adding = true;
      this.blogService.create(blog)
        .subscribe(category => {
          // this.categories.splice(0,0,category);
          alert('Posted');
          this.adding = false;
        },
        (error: AppError) => {
          if (error instanceof BadInput){
            this.invalidBlog = true;
            this.adding = false;
            this.blogError = error.message;
          }
          else throw error;
        });
    }
  }

  created(event: any) {
    // tslint:disable-next-line:no-console
    // console.log('editor-created', event)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    // console.log('editor-change', event)
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    // console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    // console.log('blur', $event)
    this.focused = false
    this.blured = true
  }

  maxLength(e) {
    // Doesnot allow to type more than 10
    if (e.editor.getLength() > 4000) {
      e.editor.deleteText(10, e.editor.getLength());
    }
  }

  transformHtml(htmlTextWithStyle): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }

  getEditor() {
    this.moduleConfig = {
      'emoji-shortname': true,
      'emoji-textarea': false,
      'emoji-toolbar': true,
      blotFormatter: {
        // empty object for default behaviour.
      },
      'toolbar': {
        container: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video'],                         // link and image, video
          ['emoji'],
        ],
        handlers: { 'emoji': function () { } },

      }

    }
  }



}
