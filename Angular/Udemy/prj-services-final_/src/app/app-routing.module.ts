import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  //{ path: "recipes", loadChildren: "./recipes/recipes.module#RecipesModule" },
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    loadChildren: () =>
      import("./recipes/recipes.module").then(m => m.RecipesModule)
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
    canActivateChild: [AuthGuard],ng update @angular/core@8 @angular/cli@8
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
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
