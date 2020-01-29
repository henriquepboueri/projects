import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FnParam } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        /* this.recipe = this.recipeService.getRecipesById(+params['id']); */
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipesById(this.id);
    }) ;
  }

  onAddToShoppingList() {
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients); 
  }

}
