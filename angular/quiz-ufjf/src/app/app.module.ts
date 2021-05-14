import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Material */
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

/* Firebase*/
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

/* Custom */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionHostDirective } from './question-host.directive';
import { InstrucoesComponent } from './instrucoes/instrucoes.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { RankingComponent } from './ranking/ranking.component';
import { TimeItPipe } from './time-it.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    HomeComponent,
    QuizComponent,
    QuestionHostDirective,
    InstrucoesComponent,
    ResultadoComponent,
    RankingComponent,
    TimeItPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    // Material -- begin
    MatRadioModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatTableModule,
    // Material -- end
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
