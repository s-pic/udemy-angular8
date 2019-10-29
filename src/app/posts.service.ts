import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Post } from './post.model';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  FIREBASE_ENDPOINT_URL = 'https://udemy-angular8-course-backend.firebaseio.com/posts.json';

  constructor(
    private http: HttpClient
  ) {
  }

  fetchposts(): Observable<Post[]> {
    let queryParams = new HttpParams(); // HttpParams is immutable ..
    queryParams = queryParams.append('print', 'pretty'); // .. so we re-assign the variable for each key-value-pair
    queryParams = queryParams.append('custom', 'key');
    return this.http.get<{ [key: string]: Post }> ( // set the response body type by making usage of the generic character of get
    this.FIREBASE_ENDPOINT_URL,
      {
        params: queryParams
      })
      .pipe(
        map((responseData) => !responseData ? [] : Object.keys(responseData)
          // data is a nested object, we want to store it as array
            .map(internalIdKey => ({...responseData[internalIdKey], id: internalIdKey})),
        ),
        catchError((errorRes: HttpErrorResponse) => {
          // log error, reach out to analytics or something else..

          // re-throw so the subscribe call is reached
          return throwError(errorRes);
        })
      );
  }

  createPost(post: Post): Observable<any> {
    // Send Http request
    return this.http
      .post(this.FIREBASE_ENDPOINT_URL, post, {
        headers: new HttpHeaders({
          'Custom-Header': 'Post'
        })
      });
  }


  deletePosts(): Observable<any> {
    return this.http.delete(this.FIREBASE_ENDPOINT_URL);
  }
}
