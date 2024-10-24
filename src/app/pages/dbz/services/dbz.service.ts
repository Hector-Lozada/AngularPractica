import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DragonBallZ, Item } from '../interfaces/dbz';  // Asegúrate de importar la interfaz correcta

@Injectable({
  providedIn: 'root'
})
export class DragonBallService {
  public apiURL: string = 'https://dragonball-api.com/api/characters';  // URL de la API de Dragon Ball Z
  private next: string | null = null;
  private previous: string | null = null;

  constructor(private http: HttpClient) {}

  getCharacters(url?: string | null): Observable<DragonBallZ> {
    const requestUrl = url ? url : `${this.apiURL}characters`;
    return this.http.get<DragonBallZ>(requestUrl);
  }

  // Obtener un personaje específico por nombre o id
  getCharacter(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}?search=${name}`);  // Cambia esto según la estructura de la API
  }

  // Establecer la URL para la siguiente página de resultados
  set nextUrl(url: string | null) {
    this.next = url;
  }

  // Establecer la URL para la página anterior de resultados
  set previousUrl(url: string | null) {
    this.previous = url;
  }

  // Obtener la URL para la siguiente página
  get nextUrl(): string | null {
    return this.next;
  }

  // Obtener la URL para la página anterior
  get previousUrl(): string | null {
    return this.previous;
  }
}