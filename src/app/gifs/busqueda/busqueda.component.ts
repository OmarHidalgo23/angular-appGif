import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; //El ! es para decirle a angular que el campo siempre va a existir

  constructor(private gifsService: GifsService) { } //importando todo el gifService para utilizarlo mas abajo

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = "";
  }

}
