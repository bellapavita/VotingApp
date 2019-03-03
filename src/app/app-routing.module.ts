import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PollListComponent } from "./polls/poll-list/poll-list.component";
import { PollCreateComponent } from "./polls/poll-create/poll-create.component";

const routes: Routes = [
  { path: '', component: PollListComponent },
  { path: 'create', component: PollCreateComponent },
  { path: 'vote/:pollId', component: PollCreateComponent },
  { path: 'edit/:pollId', component: PollCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
