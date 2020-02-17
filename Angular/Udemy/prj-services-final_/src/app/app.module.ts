import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { SharingModule } from "./shared/sharing.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharingModule,
    /* routes */
    AppRoutingModule,
    AuthModule,
    ShoppingListModule,
    // loading lazily RecipesModule,
    CoreModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
