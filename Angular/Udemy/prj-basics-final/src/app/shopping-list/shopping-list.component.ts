import { IngredientService } from './../shared/ingredient.service';
import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = this.ingredientService.getIngredients();

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() { }

  addNewIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }




}
