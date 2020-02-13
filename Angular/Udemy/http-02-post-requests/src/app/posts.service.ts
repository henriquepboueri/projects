import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from "@angular/common/http";

import { Post } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { Observable, Subject, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  clearPosts(): Observable<any> {
    return this.http
      .delete("https://udemy-course-35908.firebaseio.com/posts.json", {
        observe: "events",
        responseType: "json" //text, blob
      })
      .pipe(
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log(event);
            console.log(event.body);
          }
        })
      );
  }

  createAndStorePost(/* postData: Post,  */ title?: string, content?: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        "https://udemy-course-35908.firebaseio.com/posts.json",
        postData,
        {
          observe: "response"
          /* observe: 'body'  */
        }
      )
      .subscribe(response => {
        //console.log(response);
        console.log(response.body);
      }),
      (error: Error) => {
        this.error.next(error.message);
      };
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams = searchParams.append("custom", "key");
    return this.http
      .get<{ [key: string]: Post }>(
        "https://udemy-course-35908.firebaseio.com/posts.json",
        {
          headers: new HttpHeaders({ CustomHeader: "Hello" }),
          params: searchParams,
          responseType : 'json'
          /*params: new HttpParams().set("print", "pretty") */
        }
      )
      .pipe(
        //map((responseData: { [key: string]: Post }) => {
        map(responseData => {
          console.log(responseData);
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorResponse => {
          return throwError(errorResponse);
        })
      );
    /*       .subscribe(
        posts => {
          return posts;
        },
        error => {
          console.log("Error occurred.");
        },
        () => console.log("Fetching completed")
      ) */
  }
}
