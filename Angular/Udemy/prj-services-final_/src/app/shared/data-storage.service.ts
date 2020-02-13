import { User } from "./../auth/user.module";
import { AuthService } from "./../auth/auth.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { map, tap, take, exhaustMap } from "rxjs/operators";

import { Recipe } from "./../recipes/recipe.model";
import { RecipeService } from "./../recipes/recipe.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        "https://udemy-course-recipe-book-6d16d.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe(console.log, console.log);
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        "https://udemy-course-recipe-book-6d16d.firebaseio.com/recipes.json"
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
