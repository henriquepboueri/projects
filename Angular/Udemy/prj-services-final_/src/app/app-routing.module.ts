import { SelectivePreloadingStrategyService } from "./selective-preloading-strategy.service";
import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
  //{ path: "recipes", loadChildren: "./recipes/recipes.module#RecipesModule" },
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    loadChildren: () =>
      import("./recipes/recipes.module").then(
        m => m.RecipesModule
      ) /* ,
    data: { preload: true } */
    //canActivate: [AuthGuard]
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./shopping-list/shopping-list.module").then(
        m => m.ShoppingListModule
      ),
    data: { preload /* any name I choose*/: true }
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  }

  /*{ path: "", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [
      { path: ":id/:name", component: UserComponent },
      { path: "add", component: AddUserComponent }
    ]
  },
  {
    path: "servers",
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {
        path: ":id",
        component: ServerComponent,
        resolve: { server: ServerResolver }
      },
      {
        path: ":id/edit",
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  {
    path: "not-found",
    component: ErrorPageComponent,
    data: { message: "Page not found!" }
  },
  { path: "**", redirectTo: "/not-found" }*/
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    //RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: SelectivePreloadingStrategyService
    })
  ],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategyService]
})
export class AppRoutingModule {}
