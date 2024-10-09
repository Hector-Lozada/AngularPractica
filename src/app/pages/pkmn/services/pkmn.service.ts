import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pkmns, Pokemon } from '../interfaces/pkmns';

@Injectable({
  providedIn: 'root'
})
export class PkmnService {
  private apiURL:string = 'https://pokeapi.co/api/v2/pokemon/'
  constructor(
    private http:HttpClient
  ) { }
  getPokemons(): Observable<Pkmns>{
    return this.http.get<Pkmns>(this.apiURL);
  }
  getPokemon(termino: string | number): Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.apiURL}${termino}`);
  }
}
