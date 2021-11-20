import { Component, Input, OnInit } from '@angular/core';

import { Comment } from '../shared/comment';
import { Dish } from '../shared/dish';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  //@Input()
  dish: Dish;

  comments: Comment[];

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.dishservice.getDish(id.toString()).then(dish => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }

}
