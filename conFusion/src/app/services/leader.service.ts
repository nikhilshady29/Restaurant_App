import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Leader } from '../shared/leader';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(
    private http: HttpClient,
    @Inject('baseURL') private baseURL
  ) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(this.baseURL+'leadership');
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(this.baseURL + 'leadership?featured=true').pipe(map(leader => leader[0]));
  }

}
