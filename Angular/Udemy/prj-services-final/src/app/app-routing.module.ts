import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";



const appRoutes: Routes = [
    { path: "", component: RecipeListComponent },
    { path: "recipes", component: RecipeListComponent },
    { path: 'shopping-list', component: ShoppingListComponent }
    /* {
         path: "recipes",
         component: RecipesComponent,
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
export class AppRoutingModule { }
