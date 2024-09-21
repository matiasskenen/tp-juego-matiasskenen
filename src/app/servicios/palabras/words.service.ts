import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  private apiUrl = 'https://random-word-api.herokuapp.com/all?lang=es';

  constructor(private http: HttpClient) {}

  getRandomWord(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

}
