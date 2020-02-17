import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipesModule } from "./recipes/recipes.module";

const appRoutes: Routes = [
  { path: "recipes", loadChildren: "./recipes/recipes.module#RecipesModule" },
  { path: "", redirectTo: "/recipes", pathMatch: "full" }
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
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
