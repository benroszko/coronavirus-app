import { Component, OnDestroy } from '@angular/core';
import { CoronaCountryService } from '../../services/corona-country.service';
import { Subscription } from 'rxjs';
import { CoronaCountry } from '../../model/CoronaCountry';
import { SortPipe } from '../../pipes/sort.pipe';
import { faSort } from '@fortawesome/free-solid-svg-icons';

class Column {
  colName: string;
  sortDesc: boolean;

  constructor(colName) {
    this.colName = colName;
    this.sortDesc = false;
  }
}

@Component({
  selector: 'app-corona-table',
  templateUrl: './corona-table.component.html',
  styleUrls: ['./corona-table.component.css']
})
export class CoronaTableComponent implements OnDestroy {
  columns: Column[] = [
    new Column('Country'),
    new Column('Cases'),
    new Column('Today Cases'),
    new Column('Deaths'),
    new Column('Today Deaths'),
    new Column('Recovered')
  ];
  coronaCountries: CoronaCountry[] = [];
  coronaCountrySubscription: Subscription;
  sortPipe: SortPipe = new SortPipe();
  innerWidth: number = innerWidth;
  faSort = faSort;

  constructor(private coronaService: CoronaCountryService) {
    window.addEventListener('resize', () => this.innerWidth = innerWidth);

    this.coronaCountrySubscription = this.coronaService.getCoronaCountry().subscribe((coronaCountry: CoronaCountry) => {
      if (coronaCountry !== undefined) {
        this._isAlreadyInCoronaArray(coronaCountry.country)
          ? alert(`Country "${coronaCountry.country}" is already in table!`)
          : this.coronaCountries.push(coronaCountry);
      }
    });
  }

  ngOnDestroy() {
    this.coronaCountrySubscription.unsubscribe();
  }

  sort(col: Column) {
    this.coronaCountries = this.sortPipe.transform(this.coronaCountries, col.colName.toUpperCase(), col.sortDesc);
    col.sortDesc = !col.sortDesc;
  }

  _isAlreadyInCoronaArray(country: string): boolean {
    for (const corona of this.coronaCountries) {
      if (corona.country === country) { return true; }
    }
    return false;
  }
}
