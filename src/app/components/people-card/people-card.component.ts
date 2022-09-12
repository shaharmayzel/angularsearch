import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../../services/people/people.service';
import { Observable, map, of } from 'rxjs';
import { Person } from '../../types';
@Component({
  selector: 'app-people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.css'],
})
export class PeopleCardComponent implements OnInit {
  name: string = '';
  currentPerson: Observable<Person[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService
  ) {}
  getPeople = (searchText: string): Observable<Person[]> => {
    return this.peopleService.getData(searchText).pipe(
      map((res: Person[]) => {
        return res;
      })
    );
  };

  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
    this.currentPerson = this.getPeople(this.name);
  }
}
