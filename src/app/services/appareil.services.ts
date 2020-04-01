import {Subject} from 'rxjs';
import {Appareil} from '../models/Appareil.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppareilService {

  /** Liste des appareils */
  private appareils: Appareil[] = [];
  /** Liste des appareilsSubject */
  appareilsSubject = new Subject<Appareil[]>();

  /**
   * Initialise le service
   * @param httpClient : client effectuant les requêtes
   */
  constructor(private httpClient: HttpClient) {

  }

  /**
   *  Notifie les vues d'un changement du modèle des appareils
   */
  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }

  /**
   * Allume tous les appareils
   */
  toutAllumer() {
    for (const appareil of this.appareils) {
      this.updateToServer(appareil.id, 'allumé');
      appareil.status = 'allumé';
    }
  }

  /**
   * Eteint tous les appareils
   */
  toutEteindre() {
    for (const appareil of this.appareils) {
      this.updateToServer(appareil.id, 'éteint');
      appareil.status = 'éteint';
    }
  }

  /**
   * Allume un appareil
   * @param index du tableau de l'appareil à allumer
   */
  allumerUn(index: number) {
    this.appareils[index].status = 'allumé';
    this.updateToServer(this.appareils[index].id, 'allumé');
    this.emitAppareilSubject();
  }

  /**
   * Eteint un appareil
   * @param index du tableau de l'appareil à éteindre
   */
  eteindreUn(index: number) {
    this.appareils[index].status = 'éteint';
    this.updateToServer(this.appareils[index].id, 'éteint');
  }

  /**
   * Supprime un appareil
   * @param index du tableau de l'appareil supprimé
   */
  supprimerUn(index: number) {
    this.deleteAppareilFromServer(this.appareils[index]);
  }

  /**
   * Récupère un appareil dans la liste
   * @param id Id de l'appareil à récupérer
   */
  getAppareilById(id: number) {
    return this.appareils.find(
      (s) => {
        return s.id === id;
      }
    );
  }

  /**
   * Ajoute un appareil à la liste et lance la requete HTTP
   * @param name Nom de l'appareil
   * @param status Statut de l'appareil
   */
  addAppareil(name: string, status: string) {
    const newAppareil = new Appareil((this.appareils[(this.appareils.length - 1)].id + 1), name, status);
    this.postNewAppareil(newAppareil);
  }

  /**
   * Appelle l'API REST pour récupérer la liste des appareils
   */
  getAppareilsFromServer() {
    this.httpClient
      .get<Appareil[]>('https://192.168.1.42:81/appareils')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  /**
   * Appelle l'API REST pour ajouter un nouvel appareil
   * @param appareil : Appareil ajouté
   */
  private postNewAppareil(appareil: Appareil) {
    this.httpClient
      .post<Appareil>('https://192.168.1.42:81/appareil', appareil)
      .subscribe(
        () => {
          this.appareils.push(appareil);
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        });
  }

  /**
   * Appelle l'API REST pour supprimer l'appareil
   * @param appareil à supprimer
   */
  private deleteAppareilFromServer(appareil: Appareil) {
    this.httpClient
      .delete<Appareil>('https://192.168.1.42:81/appareil/' + appareil.id)
      .subscribe(
        () => {
          console.log('Appareil supprimé');
          const index = this.appareils.indexOf(appareil);
          if (index > -1) {
            this.appareils.splice(index, 1);
          }
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        });
  }


  /**
   * Appelle l'API REST sur le serveur distant pour mettre à jour l'appareil
   * @param appareilId id de l'appareil à mettre à jour
   * @param status mis à jour
   */
  private updateToServer(appareilId: number, status: string) {
    this.httpClient
      .put(`https://192.168.1.42:81/appareil/${appareilId}/${status}`, '')
      .subscribe(
        () => {
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        });
  }
}
