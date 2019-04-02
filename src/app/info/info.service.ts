import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class InfoService {
  constructor(private http: HttpClient) {}

  public response;

  getInfo() {
    this.http
      .get("http://localhost:3000/api/info")
      .subscribe(response => this.response = response);
  }
}
