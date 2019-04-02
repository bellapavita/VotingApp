import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PollsService } from "../polls.service";
import { Poll } from "../poll.model";

@Component({
  selector: "app-poll-create",
  templateUrl: "./poll-create.component.html",
  styleUrls: ["./poll-create.component.css"]
})
export class PollCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  poll: Poll;
  isLoading = false;
  private mode = "create";
  private pollId: string;

  constructor(
    public pollsService: PollsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("pollId")) {
        this.mode = "edit";
        this.pollId = paramMap.get("pollId");
        this.isLoading = true;
        this.pollsService.getPoll(this.pollId).subscribe(pollData => {
          this.isLoading = false;
          this.poll = {
                       id: pollData._id,
                       title: pollData.title,
                       address: "",
                       option1: pollData.option1,
                       option2: pollData.option2,
                       value1: pollData.value1,
                       value2: pollData.value2
                      };
        });
      } else {
        this.mode = "create";
        this.pollId = null;
      }
    });
  }

  onSavePoll(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.pollsService.addPoll(form.value.title, form.value.option1, form.value.option2);
    } else {
      this.pollsService.updatePoll(
        this.pollId,
        form.value.title,
        form.value.option1,
        form.value.option2,
        1,
        1
      );
    }
    form.resetForm();
  }
}
