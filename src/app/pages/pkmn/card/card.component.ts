import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pkmns } from '../interfaces/pkmns';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'pkmn-card',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges{
  @Input() public pokemonsAll:Pkmns | undefined;
  imageLoaded: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pokemonsAll']){
    }
  }
}
