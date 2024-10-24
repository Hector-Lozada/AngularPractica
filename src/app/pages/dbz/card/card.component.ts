import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DragonBallZ, Item } from '../interfaces/dbz';  // Asegúrate de que la interfaz esté correctamente importada
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'dbz-card',
  standalone: true,
  imports: [NgIf, NgFor, ModalComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']  // Corrige 'styleUrl' a 'styleUrls'
})
export class CardComponent implements OnChanges {
  @Input() public charactersAll: DragonBallZ | undefined;  // Cambiado para reflejar la estructura de Dragon Ball Z
  @ViewChild(ModalComponent) public modal!: ModalComponent;
  imageLoaded: boolean = false;
  selectedCharacter!: Item;  // Cambiado para reflejar la estructura de personajes

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['charactersAll']) {
      this.imageLoaded = false;  // Reinicia el estado de carga de imagen al recibir nuevos personajes
    }
  }

  openModal(character: Item): void {
    if (this.modal) {
      this.modal.open(character);  // Abre el modal con el personaje seleccionado
    }
  }
}