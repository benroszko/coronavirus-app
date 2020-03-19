package com.coronavirus.covid19.restControllers;

import com.coronavirus.covid19.model.CoronaCountryDto;
import com.coronavirus.covid19.services.CoronavirusService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coronavirus")
public class CoronavirusApiController {
    private final CoronavirusService coronavirusService = new CoronavirusService();

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/getData")
    @ResponseBody
    public String getData(@RequestParam String country) throws JsonProcessingException {
        CoronaCountryDto coronaCountryDto = coronavirusService.getCoronaCountry(country);
        String data;

        if (coronaCountryDto == null) {
            data = "Not found!";
        } else {
            data = coronavirusService.mapToJSONString(coronaCountryDto);
        }
        return data;
    }
}
