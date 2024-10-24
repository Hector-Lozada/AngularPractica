import { Component, OnInit } from '@angular/core';
import { DragonBallZ, Item } from './interfaces/dbz';  // Asegúrate de que la interfaz esté correctamente importada
import { DragonBallService } from './services/dbz.service';
import { HttpErrorResponse } from '@angular/common/http'; // Importa este módulo para manejar errores HTTP
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-dragon-ball',
  standalone: true,
  templateUrl: './dbz.component.html',
  imports: [CardComponent, PaginationComponent, SearchComponent],
  styleUrls: ['./dbz.component.css']
})
export class DragonBallComponent implements OnInit {
  public charactersAll!: DragonBallZ;  // Cambiado para reflejar todos los personajes
  public characters: Item[] = [];  // Almacena personajes filtrados
  public totalItems: number = 0;  // Total de items
  public currentPage: number = 1;  // Página actual
  public nextUrl: string | null = null;  // URL de la página siguiente
  public prevUrl: string | null = null;  // URL de la página anterior

  constructor(private _srvDragonBall: DragonBallService) {}

  ngOnInit(): void {
    this.loadCharacters();  // Carga la primera página al iniciar
  }

  // Método para cargar personajes, basado en la URL
  loadCharacters(url: string | null = `${this._srvDragonBall.apiURL}?page=1`): void {
    this._srvDragonBall.getCharacters(url).subscribe({
      next: (response: DragonBallZ) => {
        console.log('API Response:', response); // Verifica la respuesta de la API
        this.charactersAll = response; // Asignar respuesta a charactersAll
        this.characters = response.items; // Asigna los personajes a characters
        this.totalItems = response.meta.totalItems; // Actualiza el total de items desde meta
        this.nextUrl = response.links.next;  // Actualiza la URL de la página siguiente
        this.prevUrl = response.links.previous;  // Actualiza la URL de la página anterior
      },
      error: (err: HttpErrorResponse) => { // Manejo de errores con tipo
        console.error('Error loading characters:', err.message); // Manejo de errores
        this.characters = []; // Limpia los personajes si hay un error
        this.totalItems = 0; // Actualiza el total de items
      }
    });
  }

  // Avanzar a la siguiente página usando la URL next
  nextPage(): void {
    if (this.nextUrl) {
      this.loadCharacters(this.nextUrl);  // Cargar la página siguiente si existe
    }
  }

  // Retroceder a la página anterior usando la URL previous
  prevPage(): void {
    if (this.prevUrl) {
      this.loadCharacters(this.prevUrl);  // Cargar la página anterior si existe
    }
  }
  setNewCharacter(pokemonsNew: DragonBallZ):void{
    this.charactersAll = pokemonsNew;
  }

  // Método de búsqueda de personajes por nombre o ID
  searchCharacter(termino: string): void {
    if (termino) {
      const id = Number(termino);  
         this._srvDragonBall.getCharacter(termino); // Si es nombre, busca por nombre
  }
}
}