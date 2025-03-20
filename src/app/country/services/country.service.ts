import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = "https://restcountries.com/v3.1"

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  private http = inject(HttpClient)


  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase()

    return this.http
      .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(CountryMapper.mapRestCountryArrayToCountryArray),
        catchError((error) => {
          return throwError(() => new Error(`No se encontro un pais con la capital ${query}`))
        })
      )
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase()

    return this.http
      .get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(CountryMapper.mapRestCountryArrayToCountryArray),
        delay(2000),
        catchError((error) => {
          return throwError(() => new Error(`No se encontro un pais con la capital ${query}`))
        })
      )
  }
  searchByAlfaCode(code: string): Observable<undefined | Country> {

    return this.http
      .get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
        map(countires => countires.at(0)),
        delay(2000),
        catchError((error) => {
          return throwError(() => new Error(`No se encontro un pais con el codigo ${code}`))
        })
      )
  }
}
