import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PollListComponent } from "./polls/poll-list/poll-list.component";
import { PollCreateComponent } from "./polls/poll-create/poll-create.component";
import { InfoComponent } from "./info/info.component";

const routes: Routes = [
  { path: '', component: PollListComponent },
  { path: 'info', component: InfoComponent },
  { path: 'create', component: PollCreateComponent },
  { path: 'vote/:pollId', component: PollListComponent },
  { path: 'edit/:pollId', component: PollCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
