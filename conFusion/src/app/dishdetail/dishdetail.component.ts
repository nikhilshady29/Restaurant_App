import { Component, Input, OnInit } from '@angular/core';

import { Comment } from '../shared/comment';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  @Input()
  dish: Dish;

  comments: Comment[];

  constructor() { }

  ngOnInit(): void {
  }

}
