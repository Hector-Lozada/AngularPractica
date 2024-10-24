import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from "@angular/core";
import { Item } from './../interfaces/dbz';  // Cambié de Pokemon a Item

@Component({
    selector: 'character-modal',  // Cambié 'pokemon-modal' a 'character-modal'
    standalone: true,
    imports: [NgFor, TitleCasePipe, NgIf],
    templateUrl: './modal.component.html',
    styles: ''
})
export class ModalComponent {
    @Input() public character: Item = {  // Cambié pokemon a character
        id: 0,
        name: '',
        ki: '',
        maxKi: '',
        race: '',
        gender: 'Male',  // Cambié esta propiedad para que use la interfaz `Gender`
        description: '',
        image: '',
        affiliation: 'Z Fighter',
        deletedAt: null,
    } as Item;

    private bootstrapModal: any;

    @ViewChild('modalElement') public modalElement!: ElementRef;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.initializeModal();
        }
    }

    initializeModal(): void {
        import('bootstrap').then((bootstrap) => {
            this.bootstrapModal = new bootstrap.Modal(this.modalElement.nativeElement);
        });
    }

    open(character: Item): void {  // Cambié pokemon a character
        this.character = character;
        if (isPlatformBrowser(this.platformId)) {
            if (this.bootstrapModal) {
                this.bootstrapModal.show();
            } else {
                setTimeout(() => {
                    this.bootstrapModal.show();
                }, 0);
            }
        }
    }

    close(): void {
        this.bootstrapModal.hide();
    }
}
