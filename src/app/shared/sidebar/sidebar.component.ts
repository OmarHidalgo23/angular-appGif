import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get historiales() {
    return this.gifsService.historial;
  }

  buscarCard(palabra: string) {
    this.gifsService.buscarGifs(palabra);

  }

}
