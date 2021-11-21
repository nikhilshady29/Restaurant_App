import { Component, Inject, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';

import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';

import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [ flyInOut(), expand() ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('baseURL') private baseURL
  ) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe(
      dish => this.dish = dish,
      dishErrMess => this.dishErrMess = dishErrMess
    );
    this.promotionService.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader);
  }

}
