import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Poll } from "../poll.model";
import { PollsService } from "../polls.service";

@Component({
  selector: "app-poll-list",
  templateUrl: "./poll-list.component.html",
  styleUrls: ["./poll-list.component.css"]
})
export class PollListComponent implements OnInit, OnDestroy {
  // polls = [
  //   { title: "First Poll", content: "This is the first poll's content" },
  //   { title: "Second Poll", content: "This is the second poll's content" },
  //   { title: "Third Poll", content: "This is the third poll's content" }
  // ];
  polls: Poll[] = [];
  isLoading = false;
  private pollsSub: Subscription;

  constructor(public pollsService: PollsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.pollsService.getPolls();
    this.pollsSub = this.pollsService.getPollUpdateListener()
      .subscribe((polls: Poll[]) => {
        this.isLoading = false;
        this.polls = polls;
      });
  }

  onDelete(pollId: string) {
    this.pollsService.deletePoll(pollId);
  }

  ngOnDestroy() {
    this.pollsSub.unsubscribe();
  }
}
