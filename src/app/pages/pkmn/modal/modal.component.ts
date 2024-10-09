import { isPlatformBrowser, NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from "@angular/core";
import { Pokemon } from './../interfaces/pkmns';

@Component({
    selector: 'pokemon-modal',
    standalone: true,
    imports: [NgFor, TitleCasePipe, NgIf],
templateUrl: './modal.component.html',
    styles: ''
})
export class ModalComponent{
    @Input() public pokemon: Pokemon = {
        name: '',
        height: 0,
        weight: 0,
        sprites: {
            front_default: ''
        },
    }as Pokemon;

    private boostrapModal: any;

    @ViewChild('modalElement') public modalElement!: ElementRef;

    constructor(@Inject(PLATFORM_ID) private plataformId: Object){}
    ngAfterViewInit():void{
        if(isPlatformBrowser(this.plataformId)){
            this.initializeModal();
        }
    }
    initializeModal():void{
        import('bootstrap').then((bootstrap) => {
    this.boostrapModal = new bootstrap.Modal(this.modalElement.nativeElement)
        })
    }
    open(pokemon:Pokemon):void{
        this.pokemon = pokemon;
        if(isPlatformBrowser(this.plataformId)){
            if(this.boostrapModal){
                this.boostrapModal.show();
            }else{
                setTimeout(() => {
                    this.boostrapModal.show();
                },0)
            }
        }
    }
    close():void{
        this.boostrapModal.hide();
    }
}
