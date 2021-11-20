import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

import { Dish } from '../shared/dish';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    @Inject('baseURL') private baseURL
  ) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.baseURL + 'dishes')
                        .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(this.baseURL + 'dishes/' + id)
                        .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(this.baseURL + 'dishes?featured=true')
                        .pipe(map(dishes => dishes[0]))
                        .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
                        .pipe(map(dishes => dishes.map(dish => dish.id)))
                        .pipe(catchError(error => error));
  }

}
