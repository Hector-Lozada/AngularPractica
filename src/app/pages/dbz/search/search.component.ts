import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'dbz-search',
  template: `
    <div class="col-12">
      <div class="input-group mb-3">
        <input #txtSearch type="text" class="form-control" placeholder="Escriba el nombre del personaje" aria-label="Escriba el nombre del personaje" aria-describedby="button-addon2" (keydown.enter)="searchPersonaje(txtSearch.value)">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" (click)="searchPersonaje(txtSearch.value)">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>
  `,
  styles: ['./search.component.css'] // Asegúrate de que este archivo exista
})
export class SearchComponent {
  @Output() public eventSearch = new EventEmitter<string>();
  
  searchPersonaje(termino: string | number): void {
    const termSearch = termino.toString().trim();
    if (termSearch.length === 0) {
      return;
    }
    this.eventSearch.emit(termSearch);
  }
}