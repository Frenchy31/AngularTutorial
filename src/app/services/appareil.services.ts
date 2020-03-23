import {Subject} from 'rxjs';
import {Appareil} from '../models/Appareil.model';

export class AppareilService {

  private appareils: Appareil[] = [
    new Appareil(1, 'Télévision', 'allumé'),
    new Appareil(2, 'Cafetière', 'éteint'),
    new Appareil(3, 'Frigo', 'allumé')
  ];
  appareilsSubject = new Subject<Appareil[]>();

  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }

  toutAllumer() {
    for (const appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  toutEteindre() {
    for (const appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  allumerUn(index: number) {
    this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }
  eteindreUn(index: number) {
      this.appareils[index].status = 'éteint';
      this.emitAppareilSubject();
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id;
      }
    );
    return appareil;
  }

  addAppareil(name: string, status: string) {
    this.appareils.push(new Appareil((this.appareils[(this.appareils.length - 1)].id + 1), name, status));
    this.emitAppareilSubject();
  }

}
