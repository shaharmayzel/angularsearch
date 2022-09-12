import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Person, ResultsEntity } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private httpClient: HttpClient) {}
  getData(value: string): Observable<Person[]> {
    return this.httpClient
      .get<ResultsEntity>(`https://swapi.dev/api/people/?search=${value}`)
      .pipe(
        map((result) => {
          return result.results;
        })
      );
  }
}
