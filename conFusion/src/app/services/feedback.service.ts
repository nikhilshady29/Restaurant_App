import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private http: HttpClient,
    @Inject('baseURL') private baseURL
  ) { }

  submitFeedback(data: Feedback) :Observable<Feedback> {
    return this.http.post<Feedback>(this.baseURL + 'feedback', data);
  }

}
