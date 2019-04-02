import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Poll } from "./poll.model";

@Injectable({ providedIn: "root" })
export class PollsService {
  private polls: Poll[] = [];
  private pollsUpdated = new Subject<Poll[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPolls() {
    this.http
      .get<{ message: string; polls: any }>("http://localhost:3000/api/polls")
      .pipe(
        map(pollData => {
          return pollData.polls.map(poll => {
            return {
              title: poll.title,
              option1: poll.option1,
              option2: poll.option2,
              value1: poll.value1,
              value2: poll.value2,
              id: poll._id
            };
          });
        })
      )
      .subscribe(transformedPolls => {
        this.polls = transformedPolls;
        this.pollsUpdated.next([...this.polls]);
      });
  }

  getPollUpdateListener() {
    return this.pollsUpdated.asObservable();
  }

  getPoll(id: string) {
    return this.http.get<{ _id: string, title: string, option1: string, option2: string, value1: number, value2: number }>(
      "http://localhost:3000/api/polls/" + id
    );
  }

  addPoll(title: string, option1: string, option2: string) {
    const poll: Poll = { id: null, title: title, address: "", option1: option1, option2: option2, value1: 0, value2: 0};
    this.http
      .post<{ message: string; pollId: string }>(
        "http://localhost:3000/api/polls",
        poll
      )
      .subscribe(responseData => {
        const id = responseData.pollId;
        poll.id = id;
        this.polls.push(poll);
        this.pollsUpdated.next([...this.polls]);
        this.router.navigate(["/"]);
      });
  }

  votePoll(id, option) {
    this.http
    .post(`http://localhost:3000/api/polls` + id, option)
    .subscribe((polls: Poll[]) => {
      this.polls = polls;
    });
  }

  updatePoll(id: string, title: string, option1: string, option2: string, value1: number, value2: number) {
    const poll: Poll = { id: id,
                         title: title,
                         address: "",
                         option1: option1,
                         option2: option2,
                         value1: value1,
                         value2: value2 };
    this.http
      .put("http://localhost:3000/api/polls/" + id, poll)
      .subscribe(response => {
        const updatedPolls = [...this.polls];
        const oldPollIndex = updatedPolls.findIndex(p => p.id === poll.id);
        updatedPolls[oldPollIndex] = poll;
        this.polls = updatedPolls;
        this.pollsUpdated.next([...this.polls]);
        this.router.navigate(["/"]);
      });
  }

  deletePoll(pollId: string) {
    this.http
      .delete("http://localhost:3000/api/polls/" + pollId)
      .subscribe(() => {
        const updatedPolls = this.polls.filter(poll => poll.id !== pollId);
        this.polls = updatedPolls;
        this.pollsUpdated.next([...this.polls]);
      });
  }
}
