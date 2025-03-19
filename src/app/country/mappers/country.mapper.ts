import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-country.interface";

export class CountryMapper {

    static mapRestCountryToCountry(country: RESTCountry): Country {
        return {
            cca2: country.cca2,
            name: country.translations["spa"].common ?? "No Spanish Name",
            capital: country.capital.join(","),
            flag: country.flag,
            flagSvg: country.flags.svg,
            population: country.population,
        }
    }

    static mapRestCountryArrayToCountryArray(countries: RESTCountry[]): Country[] {
        return countries.map(CountryMapper.mapRestCountryToCountry)
    }
}