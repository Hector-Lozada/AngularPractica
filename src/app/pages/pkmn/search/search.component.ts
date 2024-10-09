import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    standalone: true,
    imports:[],
    selector: 'pokemon-search',
    template: `
    <div class="col-12">
        <div class="input-group mb-3">
            <input #txtSearch type="text" class="form-control" placeholder="Escriba el nombre del pokemon" aria-label="Escriba el nombre del pokemon" aria-describedby="button-addon2" (keydown.enter)="searchPokemon(txtSearch.value)">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" (click)="searchPokemon(txtSearch.value)"><i class="bi bi-search"></i></button>
        </div>
    </div>
    `,
    styles: ['./search.component.css']
})
export class SearchComponent {
    @Output() public eventSearch = new EventEmitter<string>();
    searchPokemon(termino:string | number):void{
        const termSearch = termino.toString().trim();
        if(termSearch.toString().length===0){
            return;
        }
        this.eventSearch.emit(termSearch);
    }
}