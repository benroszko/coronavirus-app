import { Pipe, PipeTransform } from '@angular/core';
import {CoronaCountry} from '../model/CoronaCountry';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(countries: CoronaCountry[], sortBy: string, desc: boolean): CoronaCountry[] {
    switch (sortBy) {
      case 'COUNTRY':
        sortBy = 'country';
        break;
      case 'CASES':
        sortBy = 'cases';
        break;
      case 'TODAY CASES':
        sortBy = 'todayCases';
        break;
      case 'DEATHS':
        sortBy = 'deaths';
        break;
      case 'TODAY DEATHS':
        sortBy = 'todayDeaths';
        break;
      case 'RECOVERED':
        sortBy = 'recovered';
        break;
    }

    if (sortBy === 'country') {
      return countries
        .sort((a, b) => {
          if (desc) {
            return b[sortBy] > a[sortBy] ? 1 : -1;
          } else {
            return a[sortBy] > b[sortBy] ? 1 : -1;
          }
      });
    }

    return countries
      .sort((a, b) => {
        return desc ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
      });
  }
}
