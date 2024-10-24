import { Component, Input, OnChanges, SimpleChanges, ViewChild, viewChild } from '@angular/core';
import { Pkmns, Pokemon } from '../interfaces/pkmns';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'pkmn-card',
  standalone: true,
  imports: [NgIf, NgFor, ModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges{
  @Input() public pokemonsAll:Pkmns | undefined;
  @ViewChild(ModalComponent) public modal!: ModalComponent
  imageLoaded: boolean = false;
  selectedPokemon!: Pokemon;
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemonsAll']){
      this.imageLoaded = false;
    }
  }
  openModal(pokemon: Pokemon):void{
    if(this.modal){
      this.modal.open(pokemon);
    }
  }
}
