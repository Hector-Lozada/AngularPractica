import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pkmns, Pokemon } from '../interfaces/pkmns';

@Injectable({
  providedIn: 'root'
})
export class PkmnService {
  private apiURL:string = 'https://pokeapi.co/api/v2/pokemon/'
  private next: string | null = null;
  private Previous: string | null = null;
  constructor(
    private http:HttpClient
  ) { }
  getPokemons(url: string = this.apiURL): Observable<Pkmns>{
    return this.http.get<Pkmns>(url);
  }
  getPokemon(termino: string | number): Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.apiURL}${termino}`);
  }
  set nextUrl(url:string | null){
    this.next = url;
  }
  set PreviousUrl(url: string | null){
    this.Previous = url;
  }
  get nextUrl(): string | null {
    return this.next;
  }
  get PreviousUrl() : string | null{ 
    return this.Previous;
  }
}