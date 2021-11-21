import { Component, Inject, Input, OnInit } from '@angular/core';

import { Comment } from '../shared/comment';
import { Dish } from '../shared/dish';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';

import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { flyInOut, visibility,expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [ visibility(), flyInOut(), expand() ]
})
export class DishdetailComponent implements OnInit {

  //@Input()
  dish: Dish;
  dishcopy: Dish;

  dishIds: string[];
  prev: string;
  next: string;

  visibility = 'shown';

  commentForm: FormGroup;

  formErrors = {
    'comment': '',
    'author': ''
  };

  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'comment is required.',
    }
  };

  errMess: string;

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('baseURL') private baseURL
  ) { }

  ngOnInit(): void {
    this.createForm();
    
    this.dishservice.getDishIds().subscribe(
      dishIds => this.dishIds = dishIds,
      errmess => this.errMess = errmess
    );
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
    .subscribe(
      dish => {
        this.dish = dish; this.dishcopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = 'shown';
      },
      errmess => this.errMess = <any>errmess
    );
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ] ],
      rating: [ 5, [ Validators.maxLength(5) ] ],
      comment: ['', [ Validators.required ] ]
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit() {
    const comment: Comment = { ...this.commentForm.value, date: new Date().toISOString() } ;
    
    this.dishcopy.comments.push(comment);
    
    this.dishservice.putDish(this.dishcopy)
      .subscribe(
        dish => { this.dish = dish; this.dishcopy = dish; },
        errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; }
        );
    console.log(comment);
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
  }

  onValueChanged(data?: FormGroup) {
    
    if (!data) {
      return;
    }
    
    const form = this.commentForm;
    
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  
}
