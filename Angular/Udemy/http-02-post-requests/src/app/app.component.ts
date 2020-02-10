import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Post } from "./post.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        "https://udemy-course-35908.firebaseio.com/posts.json",
        postData
      )
      .subscribe(console.log);
  }

  onFetchPosts() {
    // Send Http request
    this.http
      .get<{ [key: string]: Post }>(
        "https://udemy-course-35908.firebaseio.com/posts.json"
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
        })
      )
      .subscribe(posts => {
        console.log(posts);
        this.loadedPosts = posts;
      });
  }

  onClearPosts() {
    // Send Http request
  }
}
