import { PostsService } from "./posts.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Post } from "./post.model";
import { map, catchError } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  subscription: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.subscription = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    //this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts: Post[]) => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      (error: Error) => {
        this.error = error.message;
        this.isFetching = false;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.clearPosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
