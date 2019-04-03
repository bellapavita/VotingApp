import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Poll } from "./poll.model";

@Injectable({ providedIn: "root" })
export class PollsService {
  private polls: Poll[] = [];
  private pollsUpdated = new Subject<Poll[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPolls(): Observable<any> {
    return this.http
      .get("http://localhost:3000/api/poll/find");
  }

  getPollUpdateListener() {
    return this.pollsUpdated.asObservable();
  }

  getPoll(id: string) {
    return this.http.get<{ _id: string, title: string, option1: string, option2: string, value1: number, value2: number }>(
      "http://localhost:3000/api/polls/findById/" + id
    );
  }

  addPoll(poll: Poll): Observable<any> {
    return this.http.post<{ message: string; pollId: string }>(
        "http://localhost:3000/api/poll/addPoll", poll);
  }

  votePoll(id, option) {
    this.http
    .post(`http://localhost:3000/api/polls` + id, option)
    .subscribe((polls: Poll[]) => {
      this.polls = polls;
    });
  }

  updatePoll(id: string, title: string, option1: string, option2: string, value1: number, value2: number) {
    const poll: Poll = { _id: id,
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
        const oldPollIndex = updatedPolls.findIndex(p => p._id === poll._id);
        updatedPolls[oldPollIndex] = poll;
        this.polls = updatedPolls;
        this.pollsUpdated.next([...this.polls]);
        this.router.navigate(["/"]);
      });
  }

  deletePoll(pollId: string) {
    this.http
      .delete("http://localhost:3000/api/poll/delete/" + pollId)
      .subscribe(data => {
        console.log(data);
        // const updatedPolls = this.polls.filter(poll => poll.id !== pollId);
        // this.polls = updatedPolls;
        // this.pollsUpdated.next([...this.polls]);
        this.router.navigate(["/"]);
      });
  }
}
