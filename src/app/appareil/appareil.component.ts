import {Component, Input} from '@angular/core';
import {AppareilService} from '../services/appareil.services';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent {
  @Input() nomAppareil: string;
  @Input() statutAppareil: string;
  @Input() indexAppareil: number;
  @Input() idAppareil: number;
  constructor( private appareilService: AppareilService ) { }

  getStatus() {
     return this.statutAppareil;
  }

  onSwitch() {
    if (this.statutAppareil === 'allumé') {
      this.appareilService.eteindreUn(this.indexAppareil);
    } else if (this.statutAppareil === 'éteint') {
      this.appareilService.allumerUn(this.indexAppareil);
    }
  }

  supprimer() {
    this.appareilService.supprimerUn(this.indexAppareil);
  }
}
