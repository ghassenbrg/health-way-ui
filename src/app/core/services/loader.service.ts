import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
/**
 * Singleton Loader Service used to change the state of the loader Subject
 */
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject: Subject<boolean> = new Subject<boolean>();
  loaderState: Observable<boolean> = this.loaderSubject.asObservable();

  constructor() {}

  /**
   * Displays the loader
   * @returns {void}
   */
  show() {
    this.loaderSubject.next(true);
  }
  /**
   * Hides the loader
   * @returns {void}
   */
  hide() {
    this.loaderSubject.next(false);
  }
}
