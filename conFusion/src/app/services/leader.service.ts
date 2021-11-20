import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Leader } from '../shared/leader';
import { Leaders } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return of(Leaders).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    return of(Leaders.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }

}
