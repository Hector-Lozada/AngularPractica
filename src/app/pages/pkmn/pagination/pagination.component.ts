import { Component, Output, EventEmitter } from '@angular/core';
import { PkmnService } from '../services/pkmn.service';
import { NgClass } from '@angular/common';
import { Pkmns } from '../interfaces/pkmns';

@Component({
  selector: 'pokemon-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Output() public eventNewPokemons = new EventEmitter<Pkmns>();

  constructor(
    private _srvPokemon: PkmnService
  ){}
  get nextUrl():string | null{
    return this._srvPokemon.nextUrl;
  }
  get previousUrl(): string | null {
    return this._srvPokemon.PreviousUrl;
  }
  loadPokemons(url:string){
    this._srvPokemon.getPokemons(url).subscribe((pokemonsAll) => {
      pokemonsAll.results.forEach((pokemon) =>{
        this._srvPokemon.getPokemon(pokemon.name).subscribe((pokemonData) =>{
          pokemon.data = pokemonData;
          this._srvPokemon.nextUrl = pokemonsAll.next;
          this._srvPokemon.PreviousUrl = pokemonsAll.previous;
          this.eventNewPokemons.emit(pokemonsAll);
        });
      });
  });
}
}