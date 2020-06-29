import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, retry, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(this.url).pipe(
      map((value) => value),
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error);
    );
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post));
  }

  updatePost(postId, update) {
    return this.http.patch(this.url + `/${postId}`, JSON.stringify(update));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError(new NotFoundError(error));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );

      return throwError(new AppError(error));
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
