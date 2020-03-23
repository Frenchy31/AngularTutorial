import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppareilService} from '../services/appareil.services';
import {Subject, Subscription} from 'rxjs';
import {Appareil} from '../models/Appareil.model';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

  appareils: any[];
  lastUpdate = new Date();
  appareilSubscription: Subscription;
  appareilsSubject = new Subject<any[]>();

  constructor( private appareilService: AppareilService ) {

  }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: Appareil[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  getDateFormat() {
    return 'MMM d, y, h:mm a';
  }

  onAllumer() {
    this.appareilService.toutAllumer();
  }

  onEteindre() {
    if (confirm('Etes vous sûr de vouloir tout arrêter ?' )) {
      this.appareilService.toutEteindre();
    } else {
      return null;
    }
  }

  ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }
}
