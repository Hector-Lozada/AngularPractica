import { Component } from '@angular/core';
import { ListMiapiComponent } from "./pages/list-miapi/list-miapi.component";

@Component({
  selector: 'app-miapi',
  standalone: true,
  imports: [ListMiapiComponent],
  templateUrl: './miapi.component.html',
  styleUrl: './miapi.component.css'
})
export class MiapiComponent {

}
