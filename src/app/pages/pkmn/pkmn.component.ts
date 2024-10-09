import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Pkmns } from './interfaces/pkmns';
import { PkmnService } from './services/pkmn.service';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-pkmn',
  standalone: true,
  imports: [CardComponent, PaginationComponent, SearchComponent],
templateUrl: './pkmn.component.html',
  styleUrl: './pkmn.component.css'
})
export class PkmnComponent implements OnInit{
  pokemons: Pkmns | undefined;
  constructor(
    private _srvPokemon: PkmnService
  ){}
  ngOnInit(): void {
    this._srvPokemon.getPokemons().subscribe((pokemonsAll) => {
      pokemonsAll.results.forEach((pokemon) =>{
        this._srvPokemon.getPokemon(pokemon.name).subscribe((pokemonData) =>{
          pokemon.data = pokemonData;
          this._srvPokemon.nextUrl = pokemonsAll.next;
          this._srvPokemon.PreviousUrl = pokemonsAll.previous;
        });
      });
      this.pokemons = pokemonsAll;
    }
  );
  }
  setNewPokemon(pokemonsNew: Pkmns):void{
    this.pokemons = pokemonsNew;
  }
  searchPokemon(termino:string):void{
    if(termino){
      this._srvPokemon.getPokemon(termino).subscribe((pokemon) =>{
        this.pokemons = {
          count: 1,
          next: '',
          previous: null,
          results: [{
            name:pokemon.name,
            url: '',
            data:pokemon
          }]
        }
        this._srvPokemon.nextUrl = null;
        this._srvPokemon.PreviousUrl = null;
      });
    }else{
      this.ngOnInit();
    }
    
  }
}
