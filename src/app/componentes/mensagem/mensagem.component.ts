import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-mensagem',
    templateUrl: './mensagem.component.html',
    styleUrls: ['./mensagem.component.css'],
    standalone: false
})
export class MensagemComponent {

  @Input() mensagemValidacao: string = ''
}
