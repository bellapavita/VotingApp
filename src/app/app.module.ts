import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  MatInputModule,
  MatRadioModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { PollCreateComponent } from "./polls/poll-create/poll-create.component";
import { HeaderComponent } from "./header/header.component";
import { PollListComponent } from "./polls/poll-list/poll-list.component";
import { AppRoutingModule } from "./app-routing.module";
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    PollCreateComponent,
    HeaderComponent,
    PollListComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
