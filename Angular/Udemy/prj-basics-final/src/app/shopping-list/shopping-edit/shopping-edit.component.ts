import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  //@Input() ingredients: Ingredient[];
  //@Output() warnNewIngredient = new EventEmitter<{ name: string, amount: number }>();
  @Output() warnNewIngredient = new EventEmitter<Ingredient>();
  //newIngredient: Ingredient;
  @ViewChild("nameInput", { static: false }) nameInput: ElementRef;
  @ViewChild("amountInput", { static: false }) amountInput: ElementRef;

  onAddIngredient() {
    //this.newIngredient = new Ingredient(name, amount);
    //this.warnNewIngredient.emit(this.newIngredient);
    /*this.warnNewIngredient.emit(
      {name: this.nameInput.nativeElement.value,
      amount: this.amountInput.nativeElement.value})*/
    const newIngredient = new Ingredient(this.nameInput.nativeElement.value,
      this.amountInput.nativeElement.value)
    this.warnNewIngredient.emit(newIngredient);
    this.onClear();
  }

  onClear() {
    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }

  constructor() { }

  ngOnInit() {
  }

}
