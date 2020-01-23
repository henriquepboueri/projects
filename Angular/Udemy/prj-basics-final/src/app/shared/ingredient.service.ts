import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients(){
    return this.ingredients;
  }

  constructor() { }
}