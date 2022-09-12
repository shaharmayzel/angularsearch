import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people/people.service';
import { map, Subject, switchMap, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';
import { Person } from '../../types';
@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
})
export class PeopleListComponent implements OnInit {
  private subjectKeyUp = new Subject<any>();
  peopleData$: Observable<Person[]> = of([]);
  debounceDelay = 400;
  searchText = '';
  constructor(
    public peopleService: PeopleService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.peopleData$ = this.subjectKeyUp.pipe(
      debounceTime(this.debounceDelay),
      distinctUntilChanged(),
      switchMap((value) => this.getPeople(value))
    );
  }

  onSearch($event: any) {
    const value = $event.target.value;
    this.searchText = value;
    this.subjectKeyUp.next(value);
  }
  getPeople = (searchText: string): Observable<Person[]> => {
    return this.peopleService.getData(searchText).pipe(
      map((res: Person[]) => {
        res.sort((a, b) => {
          return a.name < b.name ? -1 : 1;
        });
        return res;
      })
    );
  };
  onCleanSearch() {
    this.searchText = '';
    this.subjectKeyUp.next('');
  }
}
