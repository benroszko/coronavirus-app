import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {CoronaCountry} from '../model/CoronaCountry';

@Injectable({
  providedIn: 'root'
})
export class CoronaCountryService {
  private coronaCountry = new Subject<CoronaCountry>();

  constructor() { }

  getCoronaCountry(): Observable<CoronaCountry> {
    return this.coronaCountry.asObservable();
  }

  updateCoronaCountry(coronaCountry: CoronaCountry) {
    this.coronaCountry.next(coronaCountry);
  }
}
