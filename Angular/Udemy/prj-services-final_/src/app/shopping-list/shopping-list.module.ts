import { SharingModule } from "./../shared/sharing.module";
import { NgModule } from "@angular/core";

import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { RecipeService } from "../recipes/recipe.service";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [SharingModule, FormsModule, ShoppingListRoutingModule],
  //exports: [ShoppingListComponent, ShoppingEditComponent],
  providers: [RecipeService]
})
export class ShoppingListModule {}
