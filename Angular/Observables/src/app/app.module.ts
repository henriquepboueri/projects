import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SubjectComponent } from "./subject/subject.component";
import { ObservableComponent } from "./observable/observable.component";
import { BehaviorsubjectComponent } from "./behaviorsubject/behaviorsubject.component";
import { ReplaysubjectComponent } from "./replaysubject/replaysubject.component";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "observable", component: ObservableComponent },
  { path: "subject", component: SubjectComponent },
  { path: "behaviorsubject", component: BehaviorsubjectComponent },
  { path: "replaysubject", component: ReplaysubjectComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    SubjectComponent,
    ObservableComponent,
    BehaviorsubjectComponent,
    ReplaysubjectComponent,
    HomeComponent
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
