import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const myNumbers = interval(1000);
    // myNumbers.subscribe(
    //   (number: Number) => {
    //     console.log(number);
    //   }
    // );
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      },2000);
      setTimeout(() => {
        observer.next('second package');
      },4000);
      setTimeout(() => {
        observer.error('error package');
      },5000);
    });

    myObservable.subscribe(
      (data: String) => {console.log(data); },
      (error: String) => {console.log(error); }),
      () => {console.log('Completed'); }
  };
}
