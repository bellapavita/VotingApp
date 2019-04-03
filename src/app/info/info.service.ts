import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InfoService {
  constructor(private http: HttpClient) {}

  public response;

  public getInfo(): Observable<any> {
    return this.http.get('http://localhost:3000/api/info/getInfo');
  }
}
