import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly url = 'https://jsonplaceholder.typicode.com/posts'

  constructor(private client: HttpClient) {  }

  getPost(): Observable<any> {
    return this.client.get(this.url);
  }
}
