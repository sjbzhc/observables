import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = interval(1000).pipe(
      map(
        (data: number) => {
          return data * 2;
        }
      )
    )
    this.numbersObsSubscription = myNumbers.subscribe(
      (number: Number) => {
        console.log(number);
      }
    );
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      },2000);
      setTimeout(() => {
        observer.next('second package');
      },4000);
      setTimeout(() => {
        observer.complete()
        // observer.error('error package');
      },5000);
      setTimeout(() => {
        observer.next('third package');
      },6000);
    });

    this.customObsSubscription = myObservable.subscribe(
      (data: String) => {console.log(data); },
      (error: String) => {console.log(error); }),
      () => {console.log('Completed'); }
  };

  ngOnDestroy() {
    this.numbersObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }
}
