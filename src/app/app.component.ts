import { Component, OnInit} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {error} from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  // tslint:disable-next-line:use-lifecycle-interface
  secondes: number;
  ngOnInit() {
    const counter = interval(1000);
    counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log('Uh-oh, an error occurred! : ' + error);
      },
      () => {
        console.log('Observable complete!');
      });
  }
}
