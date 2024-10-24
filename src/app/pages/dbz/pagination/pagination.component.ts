import { Component, Output, EventEmitter } from '@angular/core';
import { DragonBallService } from '../services/dbz.service';
import { NgClass } from '@angular/common';
import { DragonBallZ, Item } from '../interfaces/dbz';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'dbz-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Output() public eventNewCharacters = new EventEmitter<DragonBallZ>();

  constructor(
    private _srvDragonBall: DragonBallService
  ) {}

  get nextUrl(): string | null {
    return this._srvDragonBall.nextUrl;
  }

  get previousUrl(): string | null {
    return this._srvDragonBall.previousUrl;
  }

  loadCharacters(url: string | null): void {
    if (url) {
      this._srvDragonBall.getCharacters(url).subscribe((charactersAll: DragonBallZ) => {
        const characterObservables = charactersAll.items.map((character: Item) => {
          // Convertir el id a string
          const characterId = character.id.toString(); // Asegúrate de que 'id' sea un número

          return this._srvDragonBall.getCharacter(characterId).pipe(
            map((characterData: any) => ({
              ...character,
              data: characterData // Asegúrate de que 'data' se define en la interfaz o usa otra propiedad
            }))
          );
        });

        // Usamos forkJoin para esperar hasta que todas las solicitudes de personajes terminen
        forkJoin(characterObservables).subscribe((fullCharacters: Item[]) => {
          this._srvDragonBall.nextUrl = charactersAll.links.next;
          this._srvDragonBall.previousUrl = charactersAll.links.previous;
          this.eventNewCharacters.emit({ ...charactersAll, items: fullCharacters });
        });
      });
    }
  }
}