package com.coronavirus.covid19.services;

import com.coronavirus.covid19.model.CoronaCountryDto;

import java.util.Arrays;

public class CoronavirusService extends AbstractService {
    private static final String CORONAVIRUS_API_BASE_URL = "https://corona.lmao.ninja/countries";

    private CoronaCountryDto[] coronavirusCountries = this.fetchData();

    private CoronaCountryDto[] fetchData() {
        return getRestTemplate().getForObject(CORONAVIRUS_API_BASE_URL, CoronaCountryDto[].class);
    }

    public CoronaCountryDto getCoronaCountry(String country) {
        return Arrays.stream(coronavirusCountries)
                .filter(data -> data.getCountry().toUpperCase().equals(country.toUpperCase()))
                .findFirst()
                .orElse(null);
    }
}
