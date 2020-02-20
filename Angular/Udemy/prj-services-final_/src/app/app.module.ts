import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";

import { SharingModule } from "./shared/sharing.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { CoreModule } from "./core.module";
import { shoppingListReducer } from "./shopping-list/store/shopping-list.reducer";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharingModule,
    /* routes */
    AppRoutingModule,
    StoreModule.forRoot({ ShoppingList: shoppingListReducer }),
    // loading lazily AuthModule,
    // loading lazily ShoppingListModule,
    // loading lazily RecipesModule,
    CoreModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
