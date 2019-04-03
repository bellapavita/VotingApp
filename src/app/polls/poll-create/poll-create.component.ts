import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

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
    public route: ActivatedRoute,
    public rt: Router
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
                       _id: pollData._id,
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
      const poll: Poll = {
        _id: "",
        address: "",
        title: form.value.title,
        option1: form.value.option1,
        option2: form.value.option2,
        value1: 0,
        value2: 0
      };
      this.pollsService.addPoll(poll)
      .subscribe(responseData => {
        console.log(responseData);
        this.rt.navigate(["/"]);
      });
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
