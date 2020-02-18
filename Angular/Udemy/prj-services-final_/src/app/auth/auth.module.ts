import { RouterModule } from "@angular/router";
import { SharingModule } from "./../shared/sharing.module";
import { FormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharingModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: AuthComponent }])
  ]
})
export class AuthModule {}
