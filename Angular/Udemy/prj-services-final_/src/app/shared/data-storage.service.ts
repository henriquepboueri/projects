import { Recipe } from "./../recipes/recipe.model";
import { RecipeService } from "./../recipes/recipe.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

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
    this.http
      .get<Recipe[]>("https://udemy-course-recipe-book-6d16d.firebaseio.com/recipes.json")
      .subscribe((recipes) => {
          console.log(recipes);
          this.recipeService.setRecipes(recipes);
      });
  }
}
