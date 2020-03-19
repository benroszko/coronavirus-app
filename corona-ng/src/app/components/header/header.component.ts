import {Component, OnInit} from '@angular/core';
import {CoronaCountryService} from '../../services/corona-country.service';
import {HttpClient} from '@angular/common/http';
import {CoronaCountry} from '../../model/CoronaCountry';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  static BASE_URL = 'http://localhost:8080/api/coronavirus';

  countryInput: string;

  constructor(private http: HttpClient, private coronaService: CoronaCountryService) { }

  ngOnInit() {}

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }

  onSubmit() {
    if (this.countryInput !== '') {
      try {
        this._fetchData();
      } catch (e) {
        console.log('ERROR');
      } finally {
        this.countryInput = '';
      }
    }
  }

  _fetchData() {
    this.http.get<CoronaCountry>(`${HeaderComponent.BASE_URL}/getData?country=${this.countryInput}`)
      .subscribe(
        (data: CoronaCountry) => {
          this.coronaService.updateCoronaCountry(data);
        },
        (error => {
          alert('Something went wrong! Check if input is correct!');
          throw new Error('Something went wrong!');
        })
      );
  }
}
