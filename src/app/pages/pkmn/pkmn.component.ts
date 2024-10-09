import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Pkmns } from './interfaces/pkmns';
import { PkmnService } from './services/pkmn.service';

@Component({
  selector: 'app-pkmn',
  standalone: true,
  imports: [CardComponent],
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
        });
      });
      this.pokemons = pokemonsAll;
    }
  );
  }
}
