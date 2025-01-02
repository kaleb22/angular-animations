import { Component } from '@angular/core';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { RouterOutlet } from '@angular/router';
import { RodapeComponent } from './componentes/rodape/rodape.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CabecalhoComponent, RouterOutlet, RodapeComponent]
})
export class AppComponent {
  title = '2806-memorando';
}
